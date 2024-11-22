import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";

export default function welcome() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const titulo = "Bem vindo(a) ao InsuCheck!";

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#FDFDFD" }}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{titulo}</Text>

          <Image
            source={require("../assets/images/welcome.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.container}>
            <Text style={styles.text}>
              Sua jornada para um diabetes mais controlado começa aqui!
            </Text>

            <TouchableOpacity
              style={styles.btnSignUp}
              onPress={() => router.push("screens/Auth/telaCadastro")}
            >
              <Text style={styles.textBtnSignUp}>Criar uma conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => router.push("./login")}
            >
              <Text style={styles.textBtnSignIn}>Fazer Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  title: {
    paddingTop: 42,
    paddingBottom: 40,
    textAlign: "center",
    fontFamily: "Urbanist_700Bold",
    fontSize: 25,
    color: "#282828",
  },

  image: {
    width: 314,
    height: 249,
    marginBottom: 36,
  },

  text: {
    fontSize: 14,
    fontFamily: "Lato_700Bold",
    fontStyle: "normal",
    textAlign: "center",
    color: "#282828",
    paddingHorizontal: 20,
    lineHeight: 21,
    marginBottom: 32,
  },

  btnSignUp: {
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    minHeight: 42,
    paddingHorizontal: 12,
    marginTop: 18,
    backgroundColor: "#2F39D3",
    borderRadius: 8,
    shadowColor: "rgba(12, 12, 13, 0.15)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 6, // Para Android
    // Segunda sombra (não suportado diretamente, mas pode ser emulado)
    shadowColorSecondary: "rgba(12, 12, 13, 0.30)",
    shadowOffsetSecondary: { width: 0, height: 1 },
    shadowOpacitySecondary: 1,
    shadowRadiusSecondary: 2,
    elevationSecondary: 3,
  },

  btnSignIn: {
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    minHeight: 42,
    paddingHorizontal: 12,
    marginTop: 18,
    backgroundColor: "#FDFDFD",
    borderWidth: 2,
    borderColor: "#2F39D3",
    borderRadius: 8,
    shadowColor: "rgba(12, 12, 13, 0.15)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 6, // Para Android
    // Segunda sombra (não suportado diretamente, mas pode ser emulado)
    shadowColorSecondary: "rgba(12, 12, 13, 0.30)",
    shadowOffsetSecondary: { width: 0, height: 1 },
    shadowOpacitySecondary: 1,
    shadowRadiusSecondary: 2,
    elevationSecondary: 3,
  },

  textBtnSignIn: {
    color: "#2F39D3",
    fontFamily: "Urbanist_700Bold",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 19.8,
  },

  textBtnSignUp: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
});
