import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function ScreenOne() {
  return (
    <View style={styles.screen}>
      <Text>Esta é a Tela Um</Text>
    </View>
  );
}

function ScreenTwo() {
  return (
    <View style={styles.screen}>
      <Text>Esta é a Tela Dois</Text>
    </View>
  );
}

function ScreenThree() {
  return (
    <View style={styles.screen}>
      <Text>Esta é a Tela Dois</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();
// Componente para o rótulo da aba "Saúde"
const TabLabelSaude = () => (
  <View style={styles.tabLabelContainer}>
    <Image
      source={require("../assets/images/saude-on.png")} // Caminho para a imagem de Saúde
      style={styles.tabImage}
    />
    <Text style={styles.tabText}>Saúde</Text>
  </View>
);

// Componente para o rótulo da aba "Evolução"
const TabLabelEvolucao = () => (
  <View style={styles.tabLabelContainer}>
    <Image
      source={require("../assets/images/bar-line-chart.png")} // Caminho para a imagem de Evolução
      style={styles.tabImage}
    />
    <Text style={styles.tabText}>Evolução</Text>
  </View>
);

// Componente para o rótulo da aba "Histórico"
const TabLabelHistorico = () => (
  <View style={styles.tabLabelContainer}>
    <Image
      source={require("../assets/images/historico.png")} // Caminho para a imagem de Histórico
      style={styles.tabImage}
    />
    <Text style={styles.tabText}>Histórico</Text>
  </View>
);
export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/user-03.png")} // Caminho para a imagem local
            style={styles.image}
          />
          <Text style={styles.perfil}>Perfil</Text>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Image
            source={require("../assets/images/plus.png")} // Caminho para a imagem local
            style={styles.imagePlus}
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Saúde"
          options={{
            tabBarLabel: () => <TabLabelSaude />, // Usa o componente de rótulo para Saúde
          }}
          component={ScreenOne}
        />
        <Tab.Screen name="Evolução" component={ScreenTwo} />
        <Tab.Screen name="Histórico" component={ScreenThree} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    height: 108,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    gap: 6,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    backgroundColor: "#6179FA",
    width: 93,
    height: 40,
    borderRadius: 100,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 43,
    marginLeft: 20,
    gap: 6,
  },
  image: {
    color: "red",
  },
  perfil: {
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#6179FA",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42,
    marginRight: 20,
  },
  tabLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
