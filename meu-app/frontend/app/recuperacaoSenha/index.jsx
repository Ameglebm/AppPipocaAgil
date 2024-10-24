import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function RecSenha() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text === "" || validateEmail(text)) {
      setError("");
    } else {
      setError("Insira o e-mail utilizado no cadastro.");
    }
  };

  const handleSend = () => {
    console.log("Enviar e-mail para redefinir senha");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnVoltar}
          >
            <Image source={require("../assets/images/backIcon.png")} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Recupere sua conta</Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.title}>
            Insira seu e-mail e enviaremos um link para redefinir a senha.
          </Text>
          <Text style={styles.emailTitle}>E-mail*</Text>
          <TextInput
            value={email}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#B1B0AF"
            onChangeText={handleEmailChange}
            style={[styles.inputEmail, error ? styles.inputError : null]}
          />
          {error ? (
            <View style={styles.errorContainer}>
              <Image
                source={require("../assets/images/warning-circle.png")}
                style={styles.warningIcon}
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.btnEnviar} onPress={handleSend}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RecSenha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FDFDFD",
    alignItems: "center",
  },
  container2: {
    marginTop: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
});
