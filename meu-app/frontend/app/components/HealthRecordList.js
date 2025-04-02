import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux"; // Importando o useSelector


export default function HealthRecordList({ records, title, unit }) {
  // Obtendo os filtros do Redux
  const { selectedHealthParams, selectedTimePeriod } = useSelector(
    (state) => state.filter || {} // Garante que, se o estado estiver undefined, o fallback seja um objeto vazio
  );

  // Função para filtrar os registros com base nos filtros aplicados
  const filteredRecords = records.filter((item) => {
    // Filtrando pelos parâmetros de saúde
    const matchesHealthParams = selectedHealthParams.includes(item.healthParam);

    // Filtrando pelo período de tempo (isso é um exemplo, ajuste conforme necessário)
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
    }

    // Se o registro corresponder a ambos os filtros, ele será exibido
    return matchesHealthParams && matchesTimePeriod;
  });
  return (
    <View>
      <FlatList
        data={[...filteredRecords].reverse()} // Inverte os registros para exibição
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const date = new Date(item.timestamp);
          const day = date.getDate();

          return (
            <View style={styles.recordItem}>
              <View style={styles.recordContent}>
                <Text style={styles.dateText}>{day} |</Text>
                <Text style={styles.recordText}>{title}</Text>
              </View>
              <Text style={styles.textValue}>
                {item.value} {unit}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
