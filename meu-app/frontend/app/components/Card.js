import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

// Componentes
import DropIcon from "../components/SvgComponents/Drop";
import Plus from "../components/SvgComponents/Plus";

const Card = ({ title, value, record, onPress }) => {
  return (
    <TouchableOpacity style={styles.mainView} onPress={onPress}>
      <View style={styles.headerCard}>
        <View style={styles.contentIcon}>
          <DropIcon />
        </View>

        <Text style={styles.titleCard}>{title || "Default Title"}</Text>
      </View>

      <View style={styles.contentValue}>
        <Text style={styles.valueCard}>{value || "000"}</Text>
        <Plus stroke="#282828" />
      </View>

      <View style={styles.contentRecord}>
        <Text style={styles.recordCard}>{record || "Sem registro"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    borderRadius: 8,
    width: 320,
    maxHeight: 140,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // (0px 1px)
    shadowOpacity: 0.2, // (0.20 na rgba)
    shadowRadius: 3, // (3px)
    elevation: 3, // Para Android
  },
  headerCard: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    gap: 10,
  },
  contentIcon: {
    backgroundColor: "#F2E8E7",
    borderRadius: 16,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  titleCard: {
    fontFamily: "Lato_700Bold",
    fontSize: 14,
    lineHeight: 21,
    color: "#282828",
  },
  contentValue: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  valueCard: {
    fontFamily: "Lato_700Bold",
    fontSize: 12,
    lineHeight: 26,
    color: "#282828",
  },
  contentRecord: {
    flex: 1,
    justifyContent: "center",
  },
  recordCard: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "#282828",
  },
});
