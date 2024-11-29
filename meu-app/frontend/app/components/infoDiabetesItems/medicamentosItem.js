import { StyleSheet, Text, View } from "react-native";
import React from "react";
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel

const TipoDeInsulinaItem = () => {
  // Busca o item com id === '4' no array de dados
  const tipoDeInsulinaItem = data.find((item) => item.id === "4");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{tipoDeInsulinaItem.title}</Text>
      </View>
    </View>
  );
};

export default TipoDeInsulinaItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    alignSelf: "stretch",
  },
  title: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 22,
  },
});
