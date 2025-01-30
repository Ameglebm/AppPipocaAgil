import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Import dos icones da TopBar
import TabLabelSaude from "../components/TabTopIcons/TabLabelSaude";
import TabLabelHistorico from "../components/TabTopIcons/TabLabelHistorico";
import TabLabelEvolucao from "../components/TabTopIcons/TabLabelEvolucao";
//Import das telas de cada icone da TopBar
import ScreenSaude from "./HomeTopBar/ScreenSaude";
import ScreenEvolucao from "./HomeTopBar/ScreenEvolucao";
import ScreenHistorico from "./HomeTopBar/ScreenHistorico";
//import das telas do BottomBar
import Medicacao from "./HomeBottomBar/Medicacao";
import Relatorios from "./HomeBottomBar/Relatorios";
import Emergencia from "./HomeBottomBar/Emergencia";
//Import dos icones do BottomBar
import HomeTab from "../components/TabBottomIcons/HomeTab";
import MedicacaoTab from "../components/TabBottomIcons/MedicacaoTab";
import EmergenciaTab from "../components/TabBottomIcons/EmergenciaTab";
import RelatoriosTab from "../components/TabBottomIcons/RelatoriosTab";

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
      <TopTab.Screen
        name="Evolução"
        component={ScreenEvolucao}
        options={{
          tabBarLabel: ({ focused }) => <TabLabelEvolucao focused={focused} />,
        }}
      />
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
          tabBarIcon: ({ focused }) => <HomeTab focused={focused} />,
          headerShown: false,
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

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topBarStyle: {},
  tabBarStyle: {
    width: "100%",
    height: 70,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
