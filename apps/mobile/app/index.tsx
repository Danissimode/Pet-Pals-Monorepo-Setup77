import { useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '@/packages/core/utils/supabase'

export default function Page() {

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('session:', data.session)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Pet Pals!</Text>
      <Button title="Get Started" onPress={() => alert('Button pressed!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
