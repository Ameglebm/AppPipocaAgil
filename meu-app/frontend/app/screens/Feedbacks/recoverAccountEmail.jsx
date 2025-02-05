import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import backIcon from "../../assets/images/backIcon.png";
import mailSentImage from "../../assets/images/undraw_mail_sent_re_0ofv1.png";

export default function RecoverAccountEmail() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail
  const [code, setCode] = useState("");
  const inputs = useRef([]);

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
    // Recupera o e-mail do AsyncStorage
    const loadEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };

    loadEmail();
  }, [navigation]);

  const handleCodeChange = (text, index) => {
    // Verifica se o texto é um número válido
    if (/^\d?$/.test(text)) {
      const newCode =
        code.substring(0, index) + text + code.substring(index + 1);
      setCode(newCode);

      // Avança para o próximo campo automaticamente
      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const verifyCode = async () => {
    try {
      const response = await api.post("/auth/verify-reset-code", {
        email: email,
        code: code,
      });

      if (response.status === 201) {
        await AsyncStorage.setItem("recoveryEmail", email);
        await AsyncStorage.setItem("recoveryCode", JSON.stringify(code));
        router.push("../DefineNewPassword");
      } else {
        Alert.alert("Erro", "Falha na verificação do código.");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert("Erro", "Código inválido ou expirado.");
      } else if (error.response?.status === 500) {
        Alert.alert(
          "Erro",
          "Erro interno do servidor. Tente novamente mais tarde."
        );
      } else {
        Alert.alert("Erro", "Erro desconhecido. Tente novamente.");
      }
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 46, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={{ width: 24, height: 24 }} source={backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={mailSentImage} />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.text}>
            Verifique seu e-mail e insira o código que enviamos para continuar!
          </Text>
          <View style={styles.codeContainer}>
            {[...Array(6)].map((_, i) => (
              <TextInput
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                value={code[i] || ""}
                onChangeText={(text) => handleCodeChange(text, i)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && !code[i] && i > 0) {
                    inputs.current[i - 1].focus();
                  }
                }}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btn, { opacity: code.length === 6 ? 1 : 0.5 }]}
          onPress={verifyCode}
          disabled={code.length !== 6}
        >
          <Text style={styles.textBtn}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },

  text: {
    fontFamily: "Lato_400Regular",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 27,
    textAlign: "center",
    color: "#282828",
    paddingHorizontal: 30,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 10,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },
  btn: {
    backgroundColor: "#2F39D3",
    paddingHorizontal: 42,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2F39D3", // Persian Blue
  },
  textBtn: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 19.8,
    color: "#FDFDFD",
  },
});
