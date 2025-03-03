import React, { useEffect } from "react";
import splashScreenGif from "./assets/images/splashScreen2.gif";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Hook para navegação

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./screens/onboard"); // Navega para a tela de Onboarding
    }, 5000); // Tempo que o GIF será exibido (3 segundos)

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={splashScreenGif} // Caminho para o GIF
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
    width: "100%",
    height: "100%",
  },
});
