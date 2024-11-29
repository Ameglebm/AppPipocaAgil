import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackIconSvg from "./svgComponenets/BackIconSvg";

const CustomHeader = ({ title, style }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackIconSvg />
      </TouchableOpacity>
      <Text style={[styles.title, style]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    backgroundColor: "#FDFDFD",
    marginTop: 40,
    width: "100%",
    height: 67,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 24,
    width: 289,
    height: 27,
  },
});

export default CustomHeader;
