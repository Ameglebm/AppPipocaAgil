import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
//import { useRouter } from "expo-router";
//import Coracao from "../../components/SvgComponents/Coracao";
//import Saude from "../../components/SvgComponents/Saude";
import Cards from "../../components/Card";

export default function ScreenOne() {
  //const router = useRouter();
  const cardData = [
    { title: "Glicemia", value: "", record: "" },
    { title: "Pressão Arterial", value: "", record: "" },
    { title: "Peso", value: "", record: "" },
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
            onPress={() => console.log(`Card ${item.title} pressionado`)}
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
