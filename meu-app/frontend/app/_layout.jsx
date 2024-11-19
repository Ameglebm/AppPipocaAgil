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
import { useEffect } from "react";

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
    <Stack screenOptions={{}} /*config para todas as telas*/>
      {/* Tela Home */}
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 30.8,
            color: "#282828",
          },
        }}
      />

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
      {/* Tela de Recuperação de Senha */}
      <Stack.Screen
        name="screens/recoverYourAccount"
        options={{
          headerShown: false, // Sem header na tela de recuperação de senha
        }}
      />

      {/* Tela de CheckSuccess */}
      <Stack.Screen
        name="screens/checkSucess"
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
        name="screens/checkFailed"
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
    </Stack>
  );
}
