import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabLabelSaude from "../components/TabLabelSaude";
import TabLabelHistorico from "../components/TabLabelHistorico";
import TabLabelEvolucao from "../components/TabLabelEvolucao";

import ScreenOne from "./screenOne";
import ScreenTwo from "./screenTwo";
import ScreenThree from "./screenThree";
import Medicacao from "./medicacao";
import Relatorios from "./relatorios";
import Emergencia from "./emergencia";

import HomeTab from "../components/tabIcons/HomeTab";
import MedicacaoTab from "../components/tabIcons/MedicacaoTab";
import EmergenciaTab from "../components/tabIcons/EmergenciaTab";
import RelatoriosTab from "../components/tabIcons/RelatoriosTab";

import Header from "../components/Header";

const TopTab = createMaterialTopTabNavigator();

const BottomTab = createBottomTabNavigator();

function TopTabs() {
  return (
    <TopTab.Navigator screenOptions={{ headerShown: false }}>
      <TopTab.Screen
        name="Saúde"
        component={ScreenOne}
        options={{ tabBarLabel: () => <TabLabelSaude /> }}
      />
      <TopTab.Screen
        name="Evolução"
        component={ScreenTwo}
        options={{ tabBarLabel: () => <TabLabelEvolucao /> }}
      />
      <TopTab.Screen
        name="Histórico"
        component={ScreenThree}
        options={{ tabBarLabel: () => <TabLabelHistorico /> }}
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
        }}
      />
      <BottomTab.Screen
        name="Medicação"
        component={Medicacao}
        options={{
          tabBarIcon: ({ focused }) => <MedicacaoTab focused={focused} />,
        }}
      />
      <BottomTab.Screen
        name="Emergencia"
        component={Emergencia}
        options={{
          tabBarIcon: ({ focused }) => <EmergenciaTab focused={focused} />,
        }}
      />
      <BottomTab.Screen
        name="Relatorios"
        component={Relatorios}
        options={{
          tabBarIcon: ({ focused }) => <RelatoriosTab focused={focused} />,
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
  tabBarStyle: {
    width: "100%",
    height: 70,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
