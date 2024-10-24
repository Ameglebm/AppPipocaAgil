import { Stack, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { Urbanist_700Bold, useFonts } from "@expo-google-fonts/urbanist";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const router = useRouter();

  const [loaded, error] = useFonts({
    Urbanist_700Bold,
    Lato_400Regular,
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
            fontFamily: "Urbanist_600SemiBold",
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
            fontFamily: "Urbanist_600SemiBold",
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
        name="cadastro/index"
        options={{
          headerShown: false,
          title: "Crie a sua conta",
          headerTitleStyle: {
            fontFamily: "Urbanist_600SemiBold",
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

      {/* Tela de Inputs */}
      <Stack.Screen
        name="cadastro/inputs/inputs"
        options={{
          title: "Inputs",
          headerShown: true,
          headerTitleStyle: {
            fontFamily: "Urbanist_600SemiBold",
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

      {/* Tela de Recuperação de Senha */}
      <Stack.Screen
        name="recuperacaoSenha/index"
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
            fontFamily: "Urbanist_600SemiBold",
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
            fontFamily: "Urbanist_600SemiBold",
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
