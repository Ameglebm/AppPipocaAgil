// screens/ScreenOne.js
import React from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import Filters from "../../components/filters/Filters";
import IconHistory from "../../assets/images/icons/history.png";
import { useSelector } from "react-redux";

export default function ScreenHistory() {
  const glucoseRecords =
    useSelector((state) => state.health.glucoseRecords) || [];

  return (
    <View style={styles.screen}>
      <View style={{ alignItems: "flex-end" }}>
        <Filters />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
        <Image source={IconHistory} />
        <Text style={{ color: "#7A98FF" }}>JAN</Text>
      </View>

      <FlatList
        data={[...glucoseRecords].reverse()} // Inverte os registros
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const date = new Date(item.timestamp);
          const day = date.getDate();

          return (
            <View style={styles.recordItem}>
              <View style={styles.recordContent}>
                <Text style={styles.dateText}>{day} |</Text>
                <Text style={styles.recordText}>Glicemia</Text>
              </View>

              <Text style={styles.textValue}>{item.value} mg/dL</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 28,
  },
  tabImage: {
    width: 20,
    height: 20,
  },
  recordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 35,
  },
  recordContent: {
    flexDirection: "row",
    gap: 5,
  },
  dateText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#A0BDFF",
  },
  recordText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#0F0F0F",
  },
  textValue: {
    fontFamily: "Lato_700Bold",
    fontSize: 14,
    color: "#0F0F0F",
  },
});
