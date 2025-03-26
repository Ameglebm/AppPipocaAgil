// Bibliotecas externas
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

//Redux
import { useSelector } from "react-redux";

// Componentes
import Header from "../../components/CustomHeader";
import Plus from "../../components/SvgComponents/Plus";
import Path from "../../assets/images/icons/path-01.png";
import UpArrow from "../../assets/images/icons/arrow-narrow-up.png";
import DownArrow from "../../assets/images/icons/arrow-narrow-down.png";

export default function weight() {
  const router = useRouter();

  const weightRecords = useSelector((state) => state.weight.weightRecords);
  // Obtendo o último peso e o peso anterior
  const lastWeight =
    weightRecords.length > 0 ? weightRecords[weightRecords.length - 1] : null;

  // Função para renderizar cada item do histórico
  const renderHistoryItem = ({ item, index }) => {
    const isLastItem = index === weightRecords.length - 1;

    let weightChange = null;
    let arrow = null;

    if (isLastItem && weightRecords.length > 1) {
      const previousWeight = weightRecords[weightRecords.length - 2];
      const diff = item.value - previousWeight.value;
      weightChange = `${diff < 0 ? "-" : ""}${Math.abs(diff)} kg`;

      if (diff > 0) {
        arrow = <Image source={UpArrow} style={styles.arrowIcon} />;
      } else if (diff < 0) {
        arrow = <Image source={DownArrow} style={styles.arrowIcon} />;
      }
    }

    return (
      <View style={{ paddingBottom: 8 }}>
        <View style={styles.historyDateTime}>
          <Text style={styles.historyDateTimeText}>{item.date}</Text>
          <Text style={styles.historyDateTimeText}>{item.time}</Text>
        </View>

        <View style={styles.historyItem}>
          <Text style={styles.historyText}>{item.value} kg</Text>
          {isLastItem && arrow && (
            <View style={styles.weightChangeContainer}>
              {arrow}
              <Text style={styles.weightChangeText}>{weightChange}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"Peso"} containerStyle={{ paddingTop: 65 }} />

      <View style={styles.box}>
        <Image source={Path} />
        <Text style={styles.textPeso}>
          {" "}
          {lastWeight ? `${lastWeight.value} kg` : "000 kg"}
        </Text>
        <Text style={styles.textRegister}>
          {lastWeight && lastWeight.date
            ? `${lastWeight.date}`
            : "Sem registro"}
        </Text>
        {/* Exibindo a setinha e a diferença, caso exista */}
      </View>

      {/* Renderizando o histórico de peso, caso haja registros */}
      {weightRecords.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Histórico</Text>
          <FlatList
            data={weightRecords}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            inverted={true}
            initialScrollIndex={weightRecords.length - 1} // Garante que o último item seja o primeiro a ser mostrado
            getItemLayout={
              (data, index) => ({
                length: 65,
                offset: 65 * index,
                index,
              }) // Ajuste o valor conforme necessário, dependendo da altura do seu item
            }
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => router.push("/screens/Weight/registerWeight")}
      >
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
    marginTop: 85,
  },
  historyContainer: {
    width: 352,
    height: 196,
    marginTop: 24,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  historyDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  historyDateTimeText: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    color: "#5E5D5C",
  },
  historyItem: {
    backgroundColor: "#F9F9F9",
    width: 320,
    height: 32,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  historyTitle: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    color: "#282828",
    paddingTop: 16,
    paddingBottom: 10,
  },
  historyText: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    color: "#282828",
  },
  weightChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    color: "#B1B0AF",
  },
  weightChangeText: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "#5E5D5C",
  },
});
