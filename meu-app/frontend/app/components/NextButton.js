import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Importa o ícone

export default function NavigationButtons({
  scrollTo,
  scrollBack,
  currentIndex,
}) {
  const [fonteLoaded] = useFonts({
    Urbanist_700Bold,
  });

  return (
    <View style={styles.container}>
      <View>
        {currentIndex > 0 && (
          <TouchableOpacity onPress={scrollBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={scrollTo} style={styles.nextButton}>
        <Text style={styles.text}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
    width: "100%",
  },
  backButton: {
    backgroundColor: "#2F39D3",
    alignSelf: "center",
    padding: 8,
    borderRadius: 25,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    width: 162,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F39D3",
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontFamily: "Urbanist_700Bold",
    color: "#FDFDFD",
    lineHeight: 19.8,
  },
});
