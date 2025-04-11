import { View, StyleSheet, Text, Linking, TouchableOpacity, Alert, StatusBar} from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import{ Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Feather, Octicons } from '@expo/vector-icons';

export default function ConfigScreen() {
    const openWebSite = () => {
        Linking.openURL('https://mail.google.com/mail/u/0/#inbox?compose=new');
    }
    const router = useRouter();
    const { user, setAuth } = useAuth();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);
    if (error) {
      Alert.alert("Error signing out", error.message);
      return;
    }
    router.push('/login');
  }

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("modal cancel"),
        style: "cancel",
        
      },
      {
        text: "Logout",
        onPress: () => handleSignOut(),
        style: "destructive",
      },
    ]);
  }
  return (
    <View style={styles.container}> 
    <StatusBar translucent/>
      <Header title="Settings" />
      <View style={styles.content}>
        <TouchableOpacity style={styles.section} onPress={() => router.push('/about')}>
          <Feather name="info" size={24} color={Colors.colors.white} />
            <Text style={styles.sectionTitle}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={openWebSite}>
          <Feather name="help-circle" size={24} color={Colors.colors.white} />
            <Text style={styles.sectionTitle}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={() => router.push('/version')}>
          <Octicons name="versions" size={24} color={Colors.colors.white} />
              <Text style={styles.sectionTitle}>Version</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={handleLogout}>
          <Feather name="log-out" size={24} color={Colors.colors.white} />
            <Text style={styles.sectionTitle}>Logout</Text>
        </TouchableOpacity>
         
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
  },
  content: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 5,
    borderRadius: 10,
    marginBottom: 30,
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.colors.gray,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.colors.white,
    
  },
})