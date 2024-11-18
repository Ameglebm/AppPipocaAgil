import {
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function checkSucess() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/images/sucess.webp")}
        />
      </View>

      <View style={styles.containerText}>
        <Text style={styles.textContainer}>
          Cadastro realizado com sucesso!
        </Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text
          style={styles.textBtn}
          onPress={() => navigation.navigate("screens/login")}
        >
          Ir para login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 168,
    height: 180
  },
  containerText: {
    marginTop: 32
  },
  textContainer: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    color: '#373737',
  },
  btn: {
    marginTop: 32
  },
  textBtn: {
    color: '#2F39D3',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontStyle:'normal',
    fontWeight: '400',
    lineHeight: 19.6,
    gap: 4,
    padding: 2
  }
})