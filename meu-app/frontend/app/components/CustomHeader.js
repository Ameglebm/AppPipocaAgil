import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BackIconSvg from "./svgComponenets/BackIconSvg";

const CustomHeader = ({ title, style }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <BackIconSvg />
      </TouchableOpacity>
      <Text style={[styles.title, style]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center", // Centraliza os itens verticalmente
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
    gap: 8,
    paddingHorizontal: 20, // Mantém espaçamento lateral
    paddingVertical: 20, // Adiciona padding vertical
  },
  backButton: {},
  title: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 24,
    width: 289,
    height: 27,
    alignItems: "center",
    lineHeight: 26, // Ajuste para evitar cortes
  },
});

export default CustomHeader;
