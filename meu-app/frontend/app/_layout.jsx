import { Stack, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import {
  Urbanist_400Regular,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const router = useRouter();

  const [loaded, error] = useFonts({
    Urbanist_400Regular,
    Urbanist_700Bold,
    Lato_400Regular,
    Lato_700Bold,
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }} /*config para todas as telas*/
    >
      {/* SplashScreen */}
      <Stack.Screen
        name="index"
        options={{
          title: "SplashScreen",
          headerShown: false,
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 30.8,
            color: "#282828",
          },
        }}
      />

      {/*Onboard*/}
      <Stack.Screen name="screens/onboard" options={{ title: "Onboard" }} />

      {/*Welcome*/}
      <Stack.Screen name="screens/welcome" options={{ title: "Welcome" }} />

      {/* Tela de Login */}
      <Stack.Screen
        name="screens/login"
        options={{
          headerShown: false,
          title: "Login",
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 30.8,
            color: "#282828",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Tela de Cadastro */}
      <Stack.Screen
        name="screens/Auth/telaCadastro"
        options={{
          headerShown: false,
          title: "Crie a sua conta",
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 30.8,
            color: "#282828",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 5,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Tela de CheckSuccess */}
      <Stack.Screen
        name="screens/Feedbacks/checkSucess"
        options={{
          title: "Sucesso",
          headerShown: false,
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 30.8,
            color: "#282828",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Tela de CheckFailed */}
      <Stack.Screen
        name="screens/Feedbacks/checkFailed"
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 30.8,
            color: "#282828",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      {/*Recovery password*/}
      <Stack.Screen
        name="screens/recoverYourAccount"
        options={{ title: "RecoverAccount" }}
      />

      {/*Define password*/}
      <Stack.Screen
        name="screens/defineNewPassword"
        options={{ title: "DefinePassword" }}
      />

      {/*HomeScreen*/}
      <Stack.Screen
        name="screens/homeScreen"
        options={{ title: "HomeScreen" }}
      />

      {/*Information of Diabete*/}
      <Stack.Screen
        name="screens/infoDiabetes"
        options={{ title: "InfoDiabetes" }}
      />

      {/* Tela de adicionar insulina */}
      <Stack.Screen
        name="screens/addInsulin"
        options={{
          headerShown: false, // Sem header na tela de add insulina
        }}
      />

      {/* Tela de adicionar medicamentos */}
      <Stack.Screen
        name="screens/addMedication"
        options={{
          headerShown: false, // Sem header na tela de add medicamentos
        }}
      />
    </Stack>
  );
}
