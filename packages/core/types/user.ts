// packages/core/types/user.ts
export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  profile_type: 'personal' | 'pro_personal' | 'pro_business';
  avatar_url: string | null;
  created_at: string;}
