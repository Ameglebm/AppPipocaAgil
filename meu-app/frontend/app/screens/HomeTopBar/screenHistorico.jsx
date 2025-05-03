import React from "react";
import { useSelector, useDispatch  } from "react-redux";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Componentes
import Filters from "../../components/filters/Filters";

//Redux
import { fetchGlucose, fetchBloodPressure, fetchWeight } from "../../reducers/healthActions";

// Assets
import IconHistory from "../../assets/images/icons/history.png";

export default function ScreenHistory() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        dispatch(fetchBloodPressure(userId));
        dispatch(fetchGlucose(userId));
        dispatch(fetchWeight(userId));
      }
    }, [userId])
  );

  const glucoseRecords =
    useSelector((state) => state.health.glucoseRecords) || [];

  const weightRecords =
    useSelector((state) => state.health.weightRecords) || [];

  const bloodPressureRecords =
    useSelector((state) => state.health.bloodPressureRecords) || [];

  const selectedFilters = useSelector((state) => state.filter.selectedHealthParams);
  const selectedTime = useSelector((state) => state.filter.selectedTimeParams);
    

  const generateTitle = (item) => {
    switch (item.type) {
      case "Glucose":
        return "Glicemia";
      case "Blood Pressure":
        return "Pressão Arterial";
      case "Weight":
        return "Peso";
      default:
        return "Registro";
    }
  };
  
    // Função para renderizar cada item
  const renderItem = (item) => {
    const date = new Date(item.createdAt);
    const day = date.getDate(); // Pega o dia da data

    const title = generateTitle(item); // Use o título do item (se disponível)

    let value = "";

    if (item.type == "Glucose") {
      value = item.value + " mg/dL";
    } else if (item.type == "Blood Pressure") {
      value = `${item.sistolica} / ${item.diastolica} mmHg`;
    } else if (item.type == "Weight") {
      value = item.peso + " kg";
    }

    return (
      <View style={styles.recordItem}>
        <View style={styles.recordContent}>
          <Text style={styles.dateText}>{day} |</Text>
          <Text style={styles.recordText}>{title}</Text>
        </View>
        <Text style={styles.textValue}>
          {value}
        </Text>
      </View>
    );
  };

  // Combine os registros de todas as fontes (glucose, weight, bloodPressure)
  const combinedRecords = [
    ...glucoseRecords.map((item) => ({ ...item, type: "Glucose" })),
    ...bloodPressureRecords.map((item) => ({ ...item, type: "Blood Pressure" })),
    ...weightRecords.map((item) => ({ ...item, type: "Weight" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   // Função para formatar mês e ano
   const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return date
    .toLocaleString("pt-BR", {
      month: "short",
    })
    .replace(".", "")
    .toUpperCase();
  };

  // Filtro por tipo
let filteredRecords = combinedRecords;
if (selectedFilters.length > 0) {
  const typeMap = {
    glicemia: "Glucose",
    pressaoArterial: "Blood Pressure",
    peso: "Weight",
  };
  filteredRecords = filteredRecords.filter((item) =>
    selectedFilters.includes(
      Object.keys(typeMap).find((key) => typeMap[key] === item.type)
    )
  );
}

// Filtro por tempo
if (selectedTime) {
  const daysMap = {
    ultimaSemana: 7,
    ultimos15dias: 15,
    ultimos30dias: 30,
  };
  const days = daysMap[selectedTime];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  filteredRecords = filteredRecords.filter(
    (item) => new Date(item.createdAt) >= cutoffDate
  );
}

// Agrupar por mês
const groupedByMonth = filteredRecords.reduce((acc, item) => {
  const month = formatMonthYear(item.createdAt);
  if (!acc[month]) acc[month] = [];
  acc[month].push(item);
  return acc;
}, {});

  return (
    <View style={styles.screen}>
      <View style={{ alignItems: "flex-end" }}>
        <Filters/>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
      {Object.entries(groupedByMonth)
      .sort((a, b) => {
      const dateA = new Date(b[1][0].createdAt); // mais recente primeiro
      const dateB = new Date(a[1][0].createdAt);
      return dateA - dateB;
      })
      .map(([month, records]) => (

          <View key={month}>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 14, alignItems: "center" }}>
              <Image source={IconHistory} />
              <Text style={{ color: "#7A98FF", fontSize: 16 }}>
              {month.toUpperCase()}
              </Text>
            </View>
            {records.map((item, index) => (
              <View key={index}>{renderItem(item)}</View>
            ))}
          </View>
        ))}
      </ScrollView>
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
