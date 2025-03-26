import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ExpandMore from "../../assets/images/icons/expand_more.png";
import ExpandLess from "../../assets/images/icons/expand_less.png";
import Checkbox from "expo-checkbox";
import { RadioButton } from "react-native-paper";

export default function Filters({ onApplyFilters }) {
  // Abrir Filtros
  const [openOptions, setOpenOptions] = useState(false);

  // Alterna entre aberto e fechado
  const toggleFilter = () => {
    setOpenOptions(!openOptions);
  };

  // Estados separados para cada grupo de filtros
  const [selectedHealthParams, setSelectedHealthParams] = useState([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(null);

  // Função para alternar seleção do checkbox
  const toggleCheckbox = (param) => {
    setSelectedHealthParams(
      (prev) =>
        prev.includes(param)
          ? prev.filter((item) => item !== param) // Remove se já estiver selecionado
          : [...prev, param] // Adiciona se não estiver selecionado
    );
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.filtersView} onPress={toggleFilter}>
        <Text style={styles.text}>Filtros</Text>
        <Image
          style={styles.contentIcon}
          source={openOptions ? ExpandLess : ExpandMore}
        />
      </TouchableOpacity>

      {openOptions && (
        <View style={styles.contentList}>
          <Text style={styles.titleOptions}>Parâmetros de Saúde</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                color={
                  selectedHealthParams.includes("peso") ? "#2F39D3" : "#848484"
                }
                value={selectedHealthParams.includes("peso")}
                onValueChange={() => toggleCheckbox("peso")}
              />
            </View>
            <Text style={styles.options}>Peso</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                color={
                  selectedHealthParams.includes("glicemia")
                    ? "#2F39D3"
                    : "#848484"
                }
                value={selectedHealthParams.includes("glicemia")}
                onValueChange={() => toggleCheckbox("glicemia")}
              />
            </View>
            <Text style={styles.options}>Glicemia</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                style={styles.checkbox}
                color={
                  selectedHealthParams.includes("pressaoArterial")
                    ? "#2F39D3"
                    : "#848484"
                }
                uncheckedColor="#848484"
                value={selectedHealthParams.includes("pressaoArterial")}
                onValueChange={() => toggleCheckbox("pressaoArterial")}
              />
            </View>
            <Text style={styles.options}>Pressão Arterial</Text>
          </View>

          <Text style={styles.titleOptions}>Dias da Semana</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.radioWrapper}>
              <RadioButton
                color="#2F39D3"
                uncheckedColor="#848484"
                value="ultimaSemana"
                status={
                  selectedTimePeriod === "ultimaSemana"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setSelectedTimePeriod("ultimaSemana")}
              />
            </View>
            <Text style={styles.options}>Última Semana</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.radioWrapper}>
              <RadioButton
                color="#2F39D3"
                uncheckedColor="#848484"
                value="ultimos15dias"
                status={
                  selectedTimePeriod === "ultimos15dias"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setSelectedTimePeriod("ultimos15dias")}
              />
            </View>
            <Text style={styles.options}>Últimos 15 dias</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.radioWrapper}>
              <RadioButton
                color="#2F39D3"
                uncheckedColor="#848484"
                value="ultimos30dias"
                status={
                  selectedTimePeriod === "ultimos30dias"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setSelectedTimePeriod("ultimos30dias")}
              />
            </View>
            <Text style={styles.options}>Últimos 30 dias</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => onApplyFilters(selectedHealthParams)}
          >
            <Text style={styles.textButton}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: 42,
    width: 186,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
  },
  filtersView: {
    width: 107,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  contentIcon: {
    marginTop: 3,
  },
  text: {
    fontFamily: "Sora_400Regular",
    fontSize: 14,
    color: "#373737",
  },
  contentList: {
    backgroundColor: "#FDFDFD",
    position: "absolute",
    zIndex: 10,
    borderRadius: 12,
    width: 185,
    height: 296,
    top: 50,
    paddingVertical: 16,
    paddingHorizontal: 15,
    gap: 10,
  },
  radioWrapper: {
    margin: 0,
    padding: 0,
    height: 20, // Tamanho fixo menor
    width: 20, // Tamanho fixo menor
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 0.8 }],
  },
  buttonView: {
    alignSelf: "flex-end",
    bottom: 0,
  },
  textButton: {
    fontSize: 13,
    color: "#2F39D3",
  },
  titleOptions: {
    fontFamily: "Sora_400Regular",
    fontSize: 14,
    color: "#373737",
  },
  options: {
    fontFamily: "Sora_400Regular",
    fontSize: 14,
    color: "#848484",
  },
  checkboxWrapper: {
    transform: [{ scale: 0.8 }],
  },
  checkbox: {
    borderWidth: 1, // Define a borda de 1px
    borderColor: "#848484", // Cor da borda
    borderRadius: 4, // Deixa as bordas arredondadas
  },
  radio: {
    // Reduz tamanho do radio
    borderWidth: 1, // Borda de 1px
    borderColor: "#848484",
    borderRadius: 1, // Mantém o formato redondo
  },
});
