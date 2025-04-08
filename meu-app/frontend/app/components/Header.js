// Bibliotecas externas
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Componentes
import User from "./SvgComponents/User";
//import Plus from "./SvgComponents/Plus";

export default function Header() {
  const router = useRouter(); // Mover o hook para o nível do componente
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => {
          router.push("../screens/Account");
        }}
      >
        <User style={styles.image}></User>
        <Text style={styles.perfil}>Conta</Text>
      </TouchableOpacity>

      {/*<TouchableOpacity style={styles.buttonContainer}>
        <Plus />
      </TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    height: 142,
    paddingTop: 42,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: "white",
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
