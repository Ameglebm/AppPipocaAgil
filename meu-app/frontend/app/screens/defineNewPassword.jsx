import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useFonts, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import { Lato_400Regular } from "@expo-google-fonts/lato";
// arquivo config da API
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function defineNewPassword() {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);
  const [secureTextNewPassword, setSecureTextNewPassword] = useState(true);
  const [secureTextVerifyPassword, setSecureTextVerifyPassword] =
    useState(true);

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [fonteLoaded] = useFonts({
    Urbanist_700Bold,
    Lato_400Regular,
  });

  const handlePress = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      setButtonColor(newState ? "#2F39D3" : "#7A98FF");
      setIsDisabled(!newState);
      return newState;
    });
  };

  const sendForm = async () => {
    let valid = true;

    if (!newPassword || newPassword.length < 8) {
      setErrorPassword("A senha deve ter pelo menos 8 caracteres.");
      valid = false;
    }

    if (newPassword !== verifyPassword) {
      setErrorPassword("As senhas não coincidem.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", {
        novaSenha: newPassword,
        confirmarNovaSenha: verifyPassword,
        userId: " ",
        token: " ",
      });

      console.log(response);

      await AsyncStorage.setItem("token", response.data.token);
      // Verifica se a resposta da API indica sucesso
      if (response.status === 200) {
        // Ajuste conforme a estrutura da sua API
        // Navega para a tela de feedback
        navigation.navigate("./recoverSucessfull"); // Nome da tela de feedback no seu navegador
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider styles={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Defina sua nova senha</Text>
        </View>

        <View>
          <View style={styles.container}>
            <View>
              <Text style={styles.subTitle}>Senha*</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Digite sua senha"
                secureTextEntry={secureTextNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor="#B1B0AF"
              />
              {errorPassword && (
                <Text style={styles.errorPass}>{errorPassword}</Text>
              )}
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() =>
                  setSecureTextNewPassword((prevState) => !prevState)
                }
              >
                <Feather
                  name={secureTextNewPassword ? "eye-off" : "eye"}
                  size={17}
                  color="#B1B0AF"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.subTitle}>Confirmar senha*</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Confirme sua senha"
                secureTextEntry={secureTextVerifyPassword}
                value={verifyPassword}
                onChangeText={setVerifyPassword}
                placeholderTextColor="#B1B0AF"
              />
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() =>
                  setSecureTextVerifyPassword((prevState) => !prevState)
                }
              >
                <Feather
                  name={secureTextVerifyPassword ? "eye-off" : "eye"}
                  size={17}
                  color="#B1B0AF"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={sendForm}>
            <Text style={styles.textBtn}>Confirmar</Text>

            {/*
                    <View style={styles.shadowLayer1}/>
                    <View style={styles.shadowLayer2}/>
                    */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
  },
  container: {
    width: 320,
    height: 162,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },
  titleContainer: {
    width: "100%", // Define a largura total da tela
    paddingHorizontal: 20, // Adiciona um padding para evitar que o texto encoste nas bordas
    marginBottom: 64,
  },
  title: {
    marginTop: 20,
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 28,
    lineHeight: 30.8,
    textAlign: "left", // Alinha o texto à esquerda
  },
  subTitle: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 21,
    marginBottom: 8,
  },
  inputs: {
    backgroundColor: "#FDFDFD",
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 22,
    width: 320,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#B1B0AF",
    borderWidth: 0.8,
    elevation: 5,
  },
  textBtn: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 19.8,
  },
  btn: {
    backgroundColor: "#2F39D3",
    width: 320,
    height: 42,
    paddingVertical: 8,
    paddingHorizontal: 80,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    elevation: 10,
  },
  iconBtn: {
    position: "absolute",
    top: 41,
    right: 15,
    zIndex: 1,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  errorPass: {
    fontSize: 12,
    color: "#ff0000",
  },
  /*
      shadowLayer1: {
        position: 'absolute',
        left: 0,
        top: 2,
        width: 320,
        height: 41,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.15)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 8,
    },
    shadowLayer2: {
        position: 'absolute',
        left: 0,
        top: 1,
        width: 320,
        height: 41,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.30)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
    },
    shadowLayer3: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 320,
        height: 65,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.15)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 8,
    },
    shadowLayer4: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 320,
        height: 65,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.30)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
    },
    */
});
