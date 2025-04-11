import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Input from '../components/Input';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      Alert.alert("Error signing in", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push('/tabs.routes');
  }

  return (
      
      <ScrollView showsVerticalScrollIndicator={false}
        style={{ gap: 40, backgroundColor: Colors.colors.background}}>
          
      <View style={styles.container}>
        {/* Welcome to the app */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        {/* Login form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Please login to continue</Text>
        </View>
        <Input
          icon={<Feather name="mail" size={18} color={Colors.colors.white} />}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          containerStyle={{
            color: Colors.colors.white,
          }}
          onChangeText={setEmail}
          value={email}
        />
        <Input
          icon={<Feather name="lock" size={18} color={Colors.colors.white} />}
          placeholder="Password"
          secureTextEntry={true}
          containerStyle={{
            color: Colors.colors.white,
          }}
          onChangeText={setPassword}
          value={password}
        />

        {/* Login button */}
        <Button title="Login" onPress={handleSignIn} loading={loading}/>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account ?</Text>
          <TouchableOpacity onPress={() => router.push('/signUp')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>


  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    paddingHorizontal: 20,
    paddingTop: 150,
    backgroundColor: Colors.colors.background,
  },
  welcomeContainer: {
    
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.colors.white,

  },
  form: {
    gap: 20,
  },
  formTitle: {
    fontSize: 20,
    color: Colors.colors.white,

  },
  forgotPassword: {
    color: Colors.colors.white,
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
      color: Colors.colors.white,
    fontSize: 16,
  },
  footerLink: {
    color: Colors.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  
})  