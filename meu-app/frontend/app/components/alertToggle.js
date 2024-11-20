import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";

const CustomSwitch = () => {
  const [alertEnabled, setAlertEnabled] = useState(false);
  const position = new Animated.Value(0); // Definindo position como uma Animated.Value

  // Efeito para ativar/desativar as notificações e iniciar a animação
  useEffect(() => {
    if (alertEnabled) {
      console.log("Alertas ativados");
      // Adicione integração com API ou lógica adicional aqui
    } else {
      console.log("Alertas desativados");
    }
    Animated.spring(position, {
      toValue: alertEnabled ? 22 : 0, // Mover o "thumb" para a posição correta
      useNativeDriver: false, // Não usa o driver nativo
    }).start();
  }, [alertEnabled]); // A animação será chamada sempre que alertEnabled mudar

  // Função para alternar o estado do switch
  const toggleSwitch = () => {
    setAlertEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertView}>
        <Image
          source={require("../assets/images/info-octagon.png")}
          style={styles.alertImage}
        />
        <Text style={styles.alertText}>Ativar notificações</Text>
      </View>

      <TouchableOpacity style={styles.switchContainer} onPress={toggleSwitch}>
        <View
          style={[
            styles.track,
            { backgroundColor: alertEnabled ? "#FDFDFD" : "#FDFDFD" },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: position }] }, // Usando o Animated.Value para mover o thumb
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 352,
    height: 64,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
  },
  alertView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "#282828",
    fontFamily: "Urbanist_400Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 17.6,
  },
  alertImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  switchContainer: {
    width: 52,
    height: 32,
    padding: 8,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#7A98FF",
    justifyContent: "center",
    alignItems: "center",
  },
  track: {
    width: 48,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
  },
  thumb: {
    width: 16,
    height: 16,
    marginLeft: 5,
    backgroundColor: "#7A98FF",
    borderRadius: 10,
  },
});
