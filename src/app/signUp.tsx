import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../constants/Colors';
import Input from '../components/Input';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import Loading from '../components/Loading';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const formatPhoneNumber = (text: string) => {
    // Remove todos os caracteres não numéricos
    let cleaned = text.replace(/\D/g, "");

    // Aplica a formatação (27) 99999-9999
    if (cleaned.length > 10) {
      cleaned = cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (cleaned.length > 6) {
      cleaned = cleaned.replace(/^(\d{2})(\d{5})/, "($1) $2-");
    } else if (cleaned.length > 2) {
      cleaned = cleaned.replace(/^(\d{2})/, "($1) ");
    }

    setPhone(cleaned);
  };

  async function handleSignUp() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: phone,
      options: {
        data: {
          name: name,
          email: email,
          phone: phone,
        },
      },
    })
    if (error) {
      Alert.alert("Error signing up", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push('/login');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={{ gap: 40, backgroundColor: Colors.colors.background }}>
      <View style={styles.container}>
      <BackButton />

        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Create an account to continue</Text>
        </View>

        <Input
          icon={<Feather name="user" size={18} color={Colors.colors.white} />}
          placeholder="Name"
          containerStyle={{
            color: Colors.colors.white,
          }}
          onChangeText={setName}
          value={name}
        />
        <Input
          icon={<Feather name="mail" size={18} color={Colors.colors.white} />}
          placeholder="email@address.com"
          onChangeText={setEmail}
          autoCapitalize={'none'}
          containerStyle={{
            color: Colors.colors.white,
          }}
          value={email}
        />
        <Input
          icon={<Feather name="phone" size={18} color={Colors.colors.white} />}
          placeholder="27-9999-9999"
          onChangeText={formatPhoneNumber}
          autoCapitalize={'none'}
          containerStyle={{
            color: Colors.colors.white,
          }}
          value={phone}
        />
        <Input
          icon={<Feather name="lock" size={18} color={Colors.colors.white} />}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          containerStyle={{
            color: Colors.colors.white,
          }}
        />

        <Button title="Register" onPress={handleSignUp} loading={loading} />

      </View>
    </ScrollView>


  );
};

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    marginTop: 10,
    marginHorizontal: 20,

  },

  welcomeText: {
    fontSize: 50,
    fontWeight: "bold",

  },
  form: {
    gap: 20,
  },
  formTitle: {
    fontSize: 20,

  },
  forgotPassword: {
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    fontSize: 16,
  },
  footerLink: {
    color: Colors.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },

})  