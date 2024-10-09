import { Stack, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function Layout() {
  const router = useRouter();

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
        name="screens/checkFailed" // Atualize o caminho conforme sua estrutura
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
