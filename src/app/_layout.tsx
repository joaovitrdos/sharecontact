import { View, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '../contexts/AuthContext'; // Ajuste aqui para usar o contexto correto
import { supabase } from '../lib/supabase';
import { AuthProvider} from '../contexts/AuthContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoriteProvider } from '../contexts/FavoriteContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoriteProvider>
          <MainLayout />
        </FavoriteProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function MainLayout() {
  const router = useRouter(); // ✅ Primeiro
  const { setUser } = useAuth(); // Use setUser aqui para alterar o estado

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user); // Atualiza o estado com o usuário logado
        router.push('/tabs.routes'); // Redireciona para a rota de tabs
        return;
      }
      setUser(null); // Limpa o estado do usuário
      router.push('/login'); // Redireciona para a página de login
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.colors.background}
      />
      <Stack screenOptions={{
        headerShown: false,
        animation: "slide_from_left",
        contentStyle: {
          marginTop: 35,
        }
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
  },
});
