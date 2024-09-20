import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GifScreen from "./screens/GifScreen"; // Caminho correto para o GIF
import OnboardingScreen from "./onboarding"; // Caminho correto para Onboarding

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Gif"
        screenOptions={{ headerShown: false }} // Ocultar cabeçalho
      >
        <Stack.Screen name="Gif" component={GifScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
