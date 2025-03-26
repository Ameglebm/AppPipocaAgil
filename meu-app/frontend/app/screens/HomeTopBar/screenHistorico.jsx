// screens/ScreenOne.js
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Filters from "../../components/filters/Filters";
import IconHistory from "../../assets/images/icons/history.png";
import { useSelector } from "react-redux";
import HealthRecordList from "../../components/HealthRecordList";

export default function ScreenHistory() {
  const glucoseRecords =
    useSelector((state) => state.health.glucoseRecords) || [];

  const weightRecords =
    useSelector((state) => state.weight.weightRecords) || [];

  const allRecords = [...glucoseRecords, ...weightRecords].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const firstRecord = allRecords.length > 0 ? allRecords[0] : null;

  const monthNames = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const firstRecordMonth = firstRecord
    ? monthNames[new Date(firstRecord.timestamp).getMonth()]
    : "N/A"; // Se não houver registros

  return (
    <View style={styles.screen}>
      <View style={{ alignItems: "flex-end" }}>
        <Filters />
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
        <Image source={IconHistory} />
        <Text style={{ color: "#7A98FF" }}>{firstRecordMonth}</Text>
      </View>

      <HealthRecordList
        records={glucoseRecords}
        title="Glicemia"
        unit="mg/dL"
      />

      <HealthRecordList
        records={weightRecords.map((record) => ({
          ...record,
          value: record.peso, // Mapeia "peso" para "value"
        }))}
        title="Peso"
        unit="kg"
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
