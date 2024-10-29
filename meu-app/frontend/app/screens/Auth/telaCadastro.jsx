import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";

function TelaCadastro() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("screens/login")}
          >
            <Image
              source={require("../../assets/images/backIcon.png")}
              style={styles.btnImage}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Crie sua conta</Text>
        </View>
      </View>
      <ScrollView style={styles.dadosContainer}>
        <View style={styles.containerInput}>
          <Input></Input>
        </View>
      </ScrollView>
    </View>
  );
}

export default TelaCadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    marginTop: 56,
    marginRight: 127,
    marginBottom: 16,
    marginLeft: 20,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  btnContainer: {
    width: 24,
    height: 24,
  },
  btnImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 28,
    lineHeight: 30.8,
    color: "#282828",
    alignItems: "center",
  },
  dadosContainer: {
    flex: 1,
    backgroundColor: "#EDF3FF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  containerInput: {
    flex: 1,
    alignSelf: "center",
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 32,
    paddingLeft: 20,
  },
});
