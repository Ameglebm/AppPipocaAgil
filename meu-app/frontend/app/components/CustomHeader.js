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
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
    gap: 8,
    height: 67,
    padding: 20,
    marginTop: 10,
  },
  backButton: {},
  title: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 24,
    width: 289,
    height: 27,
    alignItems: "center",
  },
});

export default CustomHeader;
