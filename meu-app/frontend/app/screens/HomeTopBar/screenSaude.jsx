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
      ? `${glucoseRecords[glucoseRecords.length - 1].value} ± 20 mg/dL`
      : "Sem registro";

  const recordValue =
    glucoseRecords.length > 0 ? "Média mensal" : "Sem registro";

  const cardData = [
    {
      title: "Glicemia",
      value: lastGlucose,
      record: recordValue,
      onPress: () => router.push("screens/registerGlucose"),
      imageSource: require("../../assets/images/icons/drop.png"),
      iconBackgroundColor: "#F2E8E7",
      imageWave: require("../../assets/images/wave1.png"),
    },
    {
      title: "Pressão Arterial",
      value: "",
      record: "Sem registro",
      onPress: () => router.push("screens/registerPressArterial"),
      imageSource: require("../../assets/images/icons/activity.png"),
      iconBackgroundColor: "#EDF3FF",
      imageWave: require("../../assets/images/wave2.png"),
    },
    {
      title: "Peso",
      value: "",
      record: "Sem registro",
      onPress: () => router.push("screens/Weight"),
      imageSource: require("../../assets/images/icons/path.png"),
      iconBackgroundColor: "#DCECDC",
      imageWave: require("../../assets/images/wave3.png"),
    },
  ];

  return (
    <ScrollView
      style={styles.mainView}
      contentContainerStyle={styles.scrollContent}
    >
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
            imageSource={item.imageSource}
            iconBackgroundColor={item.iconBackgroundColor}
            imageWave={item.imageWave}
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
  scrollContent: {
    paddingBottom: 20,
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
