import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import backIcon from "../assets/images/icons/backIcon.png";
import alertTriangle from "../assets/images/icons/alert-triangle.png";
import Button from "../components/buttons/Button";
import useRecConta from "../hooks/useRecConta";
import EmailInput from "../components/EmailInput";
// arquivo config da API
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function RecConta() {
  const router = useRouter();
  const { email, error, handleEmailChange } = useRecConta();

  const sendRecPass = async () => {
    try {
      const response = await api.post("/auth/request-password-reset", {
        email: email,
      });

      console.log(response);

      // Verifica se existe um token antes de armazená-lo
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
      }

      // Verifica se o link foi enviado com sucesso (cheque o código de status ou a estrutura da resposta)
      if (response.status === 201) {
        await AsyncStorage.setItem("email", email);
        console.log(
          "Se o e-mail estiver registrado, você receberá um código para redefinir a senha.",
          email
        );
        router.replace("./Feedbacks/recoverAccountEmail");
      } else if (response.status === 400) {
        console.warn("Erro de validação");
      } else if (response.status === 500) {
        console.warn("Erro interno do servidor");
      }
    } catch (error) {
      console.log("Code:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.btnVoltar}
          >
            <Image source={backIcon} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Recupere sua conta</Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.title}>
            Insira seu e-mail e enviaremos um link para redefinir a senha.
          </Text>
          <EmailInput
            value={email}
            onChangeText={handleEmailChange}
            error={error}
            footerMessage="Verifique se o e-mail está correto para receber o link de redefinição."
          ></EmailInput>
          <Button title="Enviar" onPress={sendRecPass} />
        </View>
      </View>
      {error ? (
        <View style={styles.footerMessageContainer}>
          <Image source={alertTriangle} style={styles.warningTriangle} />
          <Text style={styles.footerMessageText}>Conta não encontrada</Text>
        </View>
      ) : null}
    </View>
  );
}

export default RecConta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FDFDFD",
    alignItems: "center",
  },
  container2: {
    marginTop: 56,
    alignItems: "center",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: 20,
  },
  btnVoltar: {},
  textHeader: {
    fontSize: 28,
    marginRight: 62,
    fontFamily: "Urbanist_700Bold",
  },
  emailContainer: {
    marginTop: 64,
    width: 320,
    height: 64,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    flexWrap: "wrap",
    fontFamily: "Lato_400Regular",
  },
  emailTitle: {
    marginTop: 32,
    fontSize: 14,
    alignSelf: "flex-start",
    fontFamily: "Lato_400Regular",
    lineHeight: 21,
  },
  inputEmail: {
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    gap: 8,
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 14,
    marginTop: 8,
    shadowColor: "rgba(177, 176, 175, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: "#FDFDFD",
    overflow: "hidden",
    width: "100%",
    height: 44,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 22,
  },
  inputError: {
    borderColor: "red", // Estilo da borda vermelha
  },
  btnEnviar: {
    width: "100%",
    height: 44,
    marginTop: 24,
    backgroundColor: "#2F39D3",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FDFDFD",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 19,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  warningIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  errorText: {
    color: "#F34141",
    fontSize: 14,
    fontFamily: "Lato_400Regular",
  },
  footerMessageContainer: {
    top: 16,
    marginBottom: 22,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    gap: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    width: 320,
    height: 44,
    flexDirection: "row",
  },
  footerMessageText: {
    color: "#282828",
    fontSize: 14,
    fontFamily: "Lato_400Regular",
    lineHeight: 21,
  },
  warningTriangle: {
    width: 24,
    height: 24,
  },
});
