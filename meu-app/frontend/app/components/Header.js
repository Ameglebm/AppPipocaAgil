// components/Header.js
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { removeToken } from "../Utils/tokenManager";
import User from "./svgComponenets/User";
import Plus from "./svgComponenets/Plus";

export default function Header() {
  const navigation = useNavigation();
  const router = useRouter(); // Mover o hook para o nível do componente

  const logout = async () => {
    try {
      // Remove o token do armazenamento
      await removeToken();
      console.log("Token removido com sucesso. Usuário desconectado.");
      router.replace("../screens/login");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <User style={styles.image}></User>
        <Text style={styles.perfil}>Conta</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <Plus style={styles.imagePlus}></Plus>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    height: 142,
    paddingTop: 42,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  profileContainer: {
    backgroundColor: "#6179FA",
    width: 93,
    height: 40,
    borderRadius: 100,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 43,
    marginLeft: 20,
    gap: 6,
  },
  image: {
    color: "white",
  },
  perfil: {
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
    fontFamily: "Lato_700Bold",
    fontSize: 14,
    lineHeight: 21,
  },
  buttonContainer: {
    backgroundColor: "#2F39D3",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42,
    marginRight: 20,
  },
});
