// Bibliotecas externas
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// Componentes
import Header from "../components/CustomHeader";
import ImageProfile from "../assets/images/monogram.png";
import NextIconSvg from "../components/SvgComponents/NextIconSvg";
import LogoutIcon from "../components/SvgComponents/LogoutIcon";
import { removeToken } from "../Utils/tokenManager";

const Account = () => {
  const router = useRouter();

  // Função de logout
  const logout = async () => {
    try {
      // Remove o token do armazenamento
      await removeToken();
      console.log("Token removido com sucesso. Usuário desconectado.");
      router.replace("../screens/Auth/loginScreen");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <View>
      <Header title="Conta" />

      <View>
        <View>
          <Image source={ImageProfile} />
          <Text>Nome do usuário</Text>
        </View>

        <View>
          <Text>Detalhes</Text>

          <TouchableOpacity
            onPress={() => {
              router.push("../screens/infoDiabetes");
            }}
          >
            <Text>Informações do Diabetes</Text>
            <NextIconSvg />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={logout}>
          <LogoutIcon />
          <Text>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
