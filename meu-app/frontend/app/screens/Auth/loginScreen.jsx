import { React, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import PasswordInput from "../../components/passwordInput";
import ButtonLogin from "../../components/ButtonLogin";
// arquivo config da API
import api from "../../services/api";
import { saveToken } from "../../Utils/tokenManager";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const router = useRouter();

  // Enviar form para backend
  const sendForm = async () => {
    setErrorEmail(null);
    setErrorPassword(null);

    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail("Por favor, insira um e-mail válido.");
      valid = false;
    }

    if (!password || password.length < 8) {
      setErrorPassword("A senha deve ter pelo menos 8 caracteres.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: email,
        senha: password,
      });

      console.log(response);

      if (response.status === 200 && response.data.token) {
        // Ajuste conforme o que sua API retorna como sucesso
        saveToken(response.data.token);
        router.replace("../homeScreen");
      } else {
        console.error("Login bem-sucedido, mas sem token");
      }
    } catch (error) {
      console.log("Erro no login:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100} // Evita Sobreposição
    >
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/user.webp")}
        />
      </View>

      <View style={styles.form}>
        <View>
          <View>
            <Text style={styles.textForm}>E-mail*</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu e-mail"
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              value={email}
            />
            {errorEmail && <Text style={styles.error}>{errorEmail}</Text>}
          </View>

          <View style={styles.containerPass}>
            <Text style={styles.textForm}>Senha*</Text>
            <PasswordInput
              placeholder="Digite sua senha"
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
            />
            {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
          </View>
        </View>

        {/* Navegação para a tela de recuperação de senha */}
        <View style={styles.containerForgetPass}>
          <TouchableOpacity
            onPress={() => router.push("screens/recoverYourAccount")}
          >
            <Text style={styles.textForgetPass}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBtn}>
          <ButtonLogin labelButton="Entrar" onpress={sendForm}></ButtonLogin>
        </View>
      </View>

      <View style={styles.containerFooter}>
        <Text style={styles.textFooter}>Não possui uma conta? </Text>
        <Link href={"screens/Auth/registerScreen"} style={styles.textLink}>
          {" "}
          Cadastre-se
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  image: {
    width: 66,
    height: 66,
    marginBottom: 32,
  },
  form: {
    backgroundColor: "#EDF3FF",
    flexDirection: "column",
    justifyContent: "center",
    width: 345,
    height: 305,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  textForm: {
    fontSize: 14,
    color: "#282828",
    paddingBottom: 12,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: "#B1B0AF",
    backgroundColor: "#FDFDFD",
    borderRadius: 6,
    elevation: 5,
  },
  containerPass: {
    paddingTop: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  containerForgetPass: {
    paddingTop: 16,
    paddingRight: 12,
    alignItems: "flex-end",
  },
  textForgetPass: {
    color: "#2933AA",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 19.6,
  },
  containerBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  containerFooter: {
    flex: 1,
    flexDirection: "row",
    fontSize: 14,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textFooter: {
    color: "#464646",
  },
  textLink: {
    color: "#2933AA",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 19.6,
  },
  error: {
    color: "#FF0000",
    fontSize: 12,
  },
});
