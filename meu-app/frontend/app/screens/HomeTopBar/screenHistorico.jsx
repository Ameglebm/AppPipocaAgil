import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Image, Text } from "react-native";

// Componentes
import Filters from "../../components/filters/Filters";
import HealthRecordList from "../../components/HealthRecordList";

// Assets
import IconHistory from "../../assets/images/icons/history.png";

export default function ScreenHistory() {
  const glucoseRecords =
    useSelector((state) => state.health.glucoseRecords) || [];

  const weightRecords =
    useSelector((state) => state.health.weightRecords) || [];

      // Obtendo os filtros do Redux
  const { selectedHealthParams, selectedTimePeriod } = useSelector(
    (state) => state.filter || {}
  );

  
  // Função para filtrar os registros com base nos filtros aplicados
  const filterRecords = (records) => {
    return records.filter((item) => {
      // Filtrando pelos parâmetros de saúde
      const matchesHealthParams = selectedHealthParams
        ? selectedHealthParams.includes(item.healthParam)
        : true; // Se não houver filtros, retorna true (não filtra)

      // Filtrando pelo período de tempo
      const itemDate = new Date(item.timestamp);
      const today = new Date();
      let matchesTimePeriod = false;

      if (selectedTimePeriod === "ultimaSemana") {
        const lastWeek = new Date(today.setDate(today.getDate() - 7));
        matchesTimePeriod = itemDate >= lastWeek;
      } else if (selectedTimePeriod === "ultimos15dias") {
        const last15Days = new Date(today.setDate(today.getDate() - 15));
        matchesTimePeriod = itemDate >= last15Days;
      } else if (selectedTimePeriod === "ultimos30dias") {
        const last30Days = new Date(today.setDate(today.getDate() - 30));
        matchesTimePeriod = itemDate >= last30Days;
      } else {
        matchesTimePeriod = true; // Se não houver período de tempo selecionado, não filtra
      }

      // Retorna o registro se ele corresponder aos filtros
      return matchesHealthParams && matchesTimePeriod;
    });
  };

  // Filtrando os registros de glicemia e peso
  const filteredGlucoseRecords = filterRecords(glucoseRecords);
  const filteredWeightRecords = filterRecords(weightRecords);

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
        records={filteredGlucoseRecords}
        title="Glicemia"
        unit="mg/dL"
      />

      <HealthRecordList
        records={filteredWeightRecords.map((record) => ({
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
