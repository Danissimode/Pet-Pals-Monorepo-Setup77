import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '@/packages/core/utils/supabase';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/(tabs)')
      else router.replace('/(auth)/login')
    })
  }, [])

  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
    </Stack>
  );
}
