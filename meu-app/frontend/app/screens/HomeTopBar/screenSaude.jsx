import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
//import { useRouter } from "expo-router";
//import Coracao from "../../components/SvgComponents/Coracao";
//import Saude from "../../components/SvgComponents/Saude";
import Cards from "../../components/Card";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function ScreenOne() {
  const router = useRouter();

  const glucoseRecords =
    useSelector((state) => state.health.glucoseRecords) || [];
  const lastGlucose =
    glucoseRecords.length > 0
      ? `${glucoseRecords[glucoseRecords.length - 1].glucose} ± 20 mg/dL`
      : "Sem registro";

  const recordValue =
    glucoseRecords.length > 0 ? "Média mensal" : "Sem registro";

  const cardData = [
    {
      title: "Glicemia",
      value: lastGlucose,
      record: recordValue,
      onPress: () => router.push("screens/registerGlucose"),
    },
    {
      title: "Pressão Arterial",
      value: "",
      record: "Sem registro",
      onPress: () => router.push("screens/registerPressArterial"),
    },
    {
      title: "Peso",
      value: "",
      record: "Sem registro",
      onPress: () => router.push("screens/Weight"),
    },
  ];

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>Registros de Saúde</Text>
      </View>

      <View style={styles.containerCards}>
        {cardData.map((item, index) => (
          <Cards
            key={index}
            title={item.title}
            value={item.value}
            record={item.record}
            onPress={item.onPress}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: 360,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Lato_700Bold",
    fontSize: 16,
    lineHeight: 22,
    color: "#0F0F0F",
  },
  contentTitle: {
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "center",
  },
  containerCards: {
    gap: 24,
    width: "100%",
    height: 465,
  },
});
