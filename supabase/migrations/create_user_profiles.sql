/*
  # Create user_profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `profile_type` (text, default 'personal')
      - `avatar_url` (text, nullable)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for authenticated users to read and update their own data
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  profile_type text DEFAULT 'personal',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can read own profile data' AND polrelid = 'user_profiles'::regclass) THEN
    CREATE POLICY "Users can read own profile data"
      ON user_profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can update own profile data' AND polrelid = 'user_profiles'::regclass) THEN
    CREATE POLICY "Users can update own profile data"
      ON user_profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END$$;