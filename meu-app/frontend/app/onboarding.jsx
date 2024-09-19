import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Para a navegação

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/screens/login"); // Navega para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao Onboarding!</Text>
      <Button title="Ir para Login" onPress={handleGoToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
