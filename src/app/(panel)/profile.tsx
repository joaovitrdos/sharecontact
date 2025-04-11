import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Colors } from "../../constants/Colors";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const { user: authUser, updateUser } = useAuth();

  // Atualiza o usuário ao voltar para a tela de perfil
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser?.id)
          .single();

        if (!error && data) {
          updateUser(data); // Atualiza o contexto
        }
      };

      fetchUser();
    }, [authUser?.id])
  );

  const formatPhoneNumber = (phone: string | null) => {
    if (!phone) return "Phone not informed";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    return phone;
  };

  if (!authUser) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Header title="Profile" showBackButton={false} />
        <TouchableOpacity
          style={styles.configIcon}
          onPress={() => router.push("/config")}
        >
          <Feather name="settings" size={24} color={Colors.colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 20, marginTop: 50 }}>
          <View style={styles.avatarContainer}>
            <Avatar name={authUser.name || "?"} />
          </View>

          <View style={styles.nameRow}>
            <Text style={styles.userName}>
              {authUser.name || "Name not informed"}
            </Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => router.push("/editProfile")}
            >
              <Feather name="edit" size={16} color={Colors.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <Feather name="mail" size={20} color={Colors.colors.white} />
            <Text style={styles.infoText}>
              {authUser.email || "Email not informed"}
            </Text>
          </View>

          <View style={styles.info}>
            <Feather name="phone" size={20} color={Colors.colors.white} />
            <Text style={styles.infoText}>
              {formatPhoneNumber(authUser.phone) || "Phone not informed"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  configIcon: {
    position: "absolute",
    bottom: 0,
    right: 20,
    padding: 7,
  },
  nameRow: {
    gap: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.colors.white,
  },
  editIcon: {
    padding: 7,
    borderRadius: 999,
    backgroundColor: "white",
    shadowColor: Colors.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
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
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.colors.white,
  },
});
