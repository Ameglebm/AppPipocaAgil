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
import { useSelector } from "react-redux";

const Account = () => {
  const router = useRouter();
  const userName = useSelector((state) => state.auth.userId) || "Usuário";

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
    <View style={styles.mainView}>
      <Header title="Conta" />

      <View style={styles.contentAccount}>
        <View style={styles.profileContent}>
          <Image source={ImageProfile} />
          <Text style={styles.textName}>Usuário</Text>
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.textName}>Detalhes</Text>

          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => {
              router.push("../screens/infoDiabetes");
            }}
          >
            <Text style={styles.textDescription}>Informações do Diabetes</Text>
            <NextIconSvg />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingTop: 182,
          }}
          onPress={logout}
        >
          <LogoutIcon />
          <Text style={styles.textDescription}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  contentAccount: {
    flex: 1,
    paddingTop: 16,
    flexDirection: "column",
    gap: 32,
  },
  profileContent: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 16,
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D0",
  },
  textName: {
    paddingBottom: 16,
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
  infoContent: {
    paddingTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 16,
    width: 320,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D0",
  },
  textDescription: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    lineHeight: 22,
    width: 260,
  },
});
