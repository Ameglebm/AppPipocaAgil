import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Lato_700Bold } from "@expo-google-fonts/lato";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFonts, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function home() {
  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();

  const [fonteLoaded] = useFonts({
    Urbanist_700Bold,
    Lato_700Bold,
    Inter_400Regular,
  });

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      paddingTop: 52,
      paddingBottom: 40,
      textAlign: "center",
      fontFamily: "Urbanist_700Bold",
      fontSize: 25,
      color: "#282828",
    },

    text: {
      fontSize: 14,
      fontFamily: "Lato_700Bold",
      fontStyle: "normal",
      textAlign: "center",
      color: "#282828",
      lineHeight: 21,
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

    textBtn: {
      color: "#2F39D3",
      fontWeight: "bold",
      fontSize: 18,
    },
  });

  const titulo = "Bem vindo(a) ao InsuCheck!";

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>{titulo}</Text>

          <Image
            source={require("../assets/images/home.webp")}
            className="w-[314px] h-[249px] mb-[36px]"
          ></Image>

          <Text style={styles.text}>
            Sua jornada para um diabetes mais controlado começa aqui!
          </Text>

          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => router.push("screens/Auth/telaCadastro")}
          >
            <Text className="text-[#FDFDFD] text-[18px] font-bold leading-[19,80px]">
              Criar uma conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => router.push("./login")}
          >
            <Text style={styles.textBtn} className="leading-[19,80px]">
              Fazer Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
