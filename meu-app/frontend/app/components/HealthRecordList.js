import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

export default function HealthRecordList({ records, title, unit }) {
  return (
    <View>
      <FlatList
        data={[...records].reverse()} // Inverte os registros para exibição
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
