import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

export default function GifScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Mantém a splash screen visível até que o GIF esteja pronto
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync(); // Previne que a splash screen nativa suma automaticamente

      // Oculta a splash screen nativa após a preparação (ex: 500ms ou menos)
      await SplashScreen.hideAsync();
    };

    prepare();

    // Navega automaticamente para a tela de onboarding após o tempo do GIF
    const timer = setTimeout(() => {
      navigation.replace("onboard"); // Navega para a tela de onboarding
    }, 3000); // Ajuste o tempo conforme necessário (tempo de duração do GIF)

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splashScreen2.gif")} // O GIF animado
        style={styles.gif}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  gif: {
    width: 300,
    height: 300,
  },
});
