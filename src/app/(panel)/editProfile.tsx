import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import Loading from "../../components/Loading";

export default function EditProfileScreen() {
  const router = useRouter();
  const { user: authUser, refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!authUser?.id) return;

    const loadUser = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        Alert.alert("Error", "Failed to load your profile.");
      } else {
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
      }

      setLoading(false);
    };

    loadUser();
  }, [authUser]);

  const handleSave = async () => {
    if (!authUser?.id) return;

    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("id", authUser.id);

    if (error) {
      console.error("Error updating name:", error);
      Alert.alert("Error", "Failed to update your name.");
    } else {
      await refreshUser();
      Alert.alert("Success", "Profile updated successfully.");
      router.back();
    }
  };

  const formatPhoneNumber = (phone: string | null) => {
    if (!phone) return "Phone not informed";
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 11
      ? cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
      : phone;
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <StatusBar translucent />
    <Header title='Edit Profile' />
    <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
      <View style={{ gap: 20, marginTop: 50 }}>
        <View style={styles.avatarContainer}>
          <Avatar name={name || "?"} />
        </View>
  
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.userName}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
          />
        </View>
  
        <View style={styles.info}>
          <Feather name="mail" size={20} color={Colors.colors.white} />
          <Text style={styles.infoText}>
            {email || "Email not informed"}
          </Text>
        </View>
  
        <View style={styles.info}>
          <Feather name="phone" size={20} color={Colors.colors.white} />
          <Text style={styles.infoText}>
            {formatPhoneNumber(phone)}
          </Text>
        </View>
      </View>
      
    </ScrollView>
    <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
  </View>

      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.background,
  },
  header: {
    justifyContent: "center",
    backgroundColor: Colors.colors.background,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  info: {
    width: "100%",
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: Colors.colors.gray,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.colors.gray,
    textAlign: "center",
    padding: 5,
    width: "100%",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.colors.white,
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: Colors.colors.primary,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
