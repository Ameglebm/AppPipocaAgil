import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { useRouter } from "expo-router";

//Import dos icones da TopBar
import TabLabelSaude from "../components/tabTopIcons/TabLabelSaude";
import TabLabelHistorico from "../components/tabTopIcons/TabLabelHistorico";
//import TabLabelEvolucao from "../components/tabTopIcons/TabLabelEvolucao";
//Import das telas de cada icone da TopBar
import ScreenSaude from "./HomeTopBar/screenSaude";
//import ScreenEvolucao from "./HomeTopBar/screenEvolucao";
import ScreenHistorico from "./HomeTopBar/screenHistorico";
//import das telas do BottomBar
import Medicacao from "./HomeBottomBar/medicacao";
import Relatorios from "./HomeBottomBar/relatorios";
import Emergencia from "./HomeBottomBar/emergencia";
//Import dos icones do BottomBar
//import HomeTab from "../components/tabBottomIcons/HomeTab";
import MedicacaoTab from "../components/tabBottomIcons/MedicacaoTab";
import EmergenciaTab from "../components/tabBottomIcons/EmergenciaTab";
import RelatoriosTab from "../components/tabBottomIcons/RelatoriosTab";
import ModalHome from "../components/modals/ModalHome";

import Header from "../components/Header";

const TopTab = createMaterialTopTabNavigator();

const BottomTab = createBottomTabNavigator();

function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.topBarStyle,
        tabBarIndicatorStyle: {
          backgroundColor: "#2F39D3", // Cor do indicador
          height: 2, // Altura do indicador
          borderRadius: 100, // Arredondamento do indicador
        },
      }}
    >
      <TopTab.Screen
        name="Saúde"
        component={ScreenSaude}
        options={{
          tabBarLabel: ({ focused }) => <TabLabelSaude focused={focused} />,
          headerShown: false,
        }}
      />
      {/*<TopTab.Screen
        name="Evolução"
        component={ScreenEvolucao}
        options={{
          tabBarLabel: ({ focused }) => <TabLabelEvolucao focused={focused} />,
        }}
      />*/}
      <TopTab.Screen
        name="Histórico"
        component={ScreenHistorico}
        options={{
          tabBarLabel: ({ focused }) => <TabLabelHistorico focused={focused} />,
        }}
      />
    </TopTab.Navigator>
  );
}

function PopupModalHome() {
  const [modalVisible, setModalVisible] = useState(true);
  const router = useRouter();

  const handleContinue = () => {
    setModalVisible(false); // Fecha o modal
    router.push("/screens/infoDiabetes"); // Navega para a tela de informações
  };
  return (
    <ModalHome
      modalVisible={modalVisible}
      onClose={() => setModalVisible(false)}
      onContinue={handleContinue}
    />
  );
}

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TopTabs}
        options={{
          //tabBarIcon: ({ focused }) => <HomeTab focused={focused} />,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <BottomTab.Screen
        name="Medicação"
        component={Medicacao}
        options={{
          tabBarIcon: ({ focused }) => <MedicacaoTab focused={focused} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Emergencia"
        component={Emergencia}
        options={{
          tabBarIcon: ({ focused }) => <EmergenciaTab focused={focused} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Relatorios"
        component={Relatorios}
        options={{
          tabBarIcon: ({ focused }) => <RelatoriosTab focused={focused} />,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <PopupModalHome />
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 360,
    alignSelf: "center",
  },
  topBarStyle: {},
  tabBarStyle: {
    width: "100%",
    height: 70,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
