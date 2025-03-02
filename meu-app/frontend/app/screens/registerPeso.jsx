import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Header from "../components/CustomHeader";
import Plus from "../components/SvgComponents/Plus";
import Path from "../assets/images/path-01.png";

export default function registerPeso() {
  return (
    <View style={styles.container}>
      <Header title={"Peso"} containerStyle={{ paddingTop: 60 }} />

      <View style={styles.box}>
        <Image source={Path} />
        <Text style={styles.textPeso}>000 kg</Text>
        <Text style={styles.textRegister}> Sem registro</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <Plus />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    alignItems: "center", // Centraliza a `box` horizontalmente
  },
  box: {
    width: 352,
    height: 135,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  textPeso: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 20,
    lineHeight: 22,
    color: "#282828",
  },
  textRegister: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#5E5D5C",
  },
  buttonContainer: {
    backgroundColor: "#2F39D3",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42,
  },
});
