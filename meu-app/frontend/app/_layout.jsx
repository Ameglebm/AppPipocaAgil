// React e hooks
import React, { useEffect } from "react";

// Componentes do React Native
import { TouchableOpacity } from "react-native";

// Expo Router e navegação
import { Stack, useRouter } from "expo-router";

// Redux
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import MedicationReducer from "./reducers/MedicationReducer";
import InsulinReducer from "./reducers/InsulinReducer";
import AuthReducer from "./reducers/authReducer";

// Ícones
import AntDesign from "@expo/vector-icons/AntDesign";

// Fontes
import {
  Urbanist_400Regular,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";

// Splash Screen
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

// Criando a store do Redux
const rootReducer = combineReducers({
  medication: MedicationReducer,
  insulin: InsulinReducer,
  auth: AuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

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
    <Provider store={store}>
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
        <Stack.Screen name="screens/onboard" options={{ title: "onboard" }} />

        {/*Welcome*/}
        <Stack.Screen name="screens/welcome" options={{ title: "welcome" }} />

        {/* Tela de Login */}
        <Stack.Screen
          name="screens/Auth/loginScreen"
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
          name="screens/Auth/registerScreen"
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
          name="screens/Feedbacks/checkSuccess"
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
          options={{ title: "recoverAccount" }}
        />

        <Stack.Screen
          name="screens/Feedbacks/recoverAccountEmail"
          options={{ title: "recoveryAccountEmail" }}
        />

        {/*Define password*/}
        <Stack.Screen
          name="screens/defineNewPassword"
          options={{ title: "DefinePassword" }}
        />

        <Stack.Screen
          name="screens/Feedbacks/recoverSucessfull"
          options={{ title: "RecoverSucessfull" }}
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
    </Provider>
  );
}
