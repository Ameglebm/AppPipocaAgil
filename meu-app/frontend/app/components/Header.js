// components/Header.js
import React, { useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

export default function Header() {
  const navigation = useNavigation();
  
  useEffect(() => { //Ao iniciar a página seta o header dela como false
    navigation.setOptions({headerShown: false});
  }, [navigation])
  
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/images/user-03.png")}
          style={styles.image}
        />
        <Text style={styles.perfil}>Conta</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          source={require("../assets/images/plus.png")}
          style={styles.imagePlus}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 108,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    gap: 6,
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
    fontFamily: "Lato_700Bold",
    fontSize: 14,
    lineHeight: 21,
  },
  buttonContainer: {
    backgroundColor: "#2F39D3",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 42,
    marginRight: 20,
  },
});
