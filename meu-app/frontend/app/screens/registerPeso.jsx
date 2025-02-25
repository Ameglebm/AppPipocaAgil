import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet
} from "react-native";
import styles from "../assets/styles/registerPressArterial";
import backIcon from "../assets/images/backIcon.png";
import alertSquare from "../assets/images/alert-square.png";
import balanca from "../assets/images/balanca.svg";
import { useNavigation, useRouter } from "expo-router";

export default function registerPeso() {
  const navigation = useNavigation();
  const router = useRouter();

  const [selected, setSelected] = useState();

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={[styles.container, { alignItems: "flex-start" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Peso</Text>
      </View>

      <View style={[styles.container, {backgroundColor: 'rgba(237, 243, 255, 1)'}]}>
        <TouchableOpacity style={pesoStyles.pesoBox}>
          <View>
            <Image source={balanca}/>

          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const pesoStyles = StyleSheet.create({
  pesoBox: {
    backgroundColor:' rgba(237, 243, 255, 1)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  }
})