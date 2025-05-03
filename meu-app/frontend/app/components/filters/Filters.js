import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import Checkbox from "expo-checkbox";

// Assets icons
import ExpandMore from "../../assets/images/icons/expand_more.png";
import ExpandLess from "../../assets/images/icons/expand_less.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../reducers/filtersActions";
  
export default function Filters() {
  // Reducer
  const dispatch = useDispatch();
  
  // Abrir Filtros
  const [openOptions, setOpenOptions] = useState(false);

  // Alterna entre aberto e fechado
  const toggleFilter = () => {
    setOpenOptions(!openOptions);
  };

  // Estados separados para cada grupo de filtros
  const selectedHealthParams = useSelector((state) => state.filter?.selectedHealthParams || []);
  const selectedTimeParams = useSelector((state) => state.filter?.selectedTimeParams || null);


  // Função para alternar seleção do checkbox
  const toggleCheckbox = (param) => {
    // Atualizando os filtros selecionados no Redux
    const updatedParams = selectedHealthParams.includes(param)
      ? selectedHealthParams.filter((item) => item !== param)
      : [...selectedHealthParams, param];

    dispatch(setFilter(updatedParams, selectedTimeParams));
  };

  // Função para alterar o período de tempo
  const changeTimePeriod = (period) => {
    dispatch(setFilter(selectedHealthParams, period));
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
                  selectedTimeParams === "ultimaSemana"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => changeTimePeriod("ultimaSemana")}
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
                  selectedTimeParams === "ultimos15dias"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => changeTimePeriod("ultimos15dias")}
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
                  selectedTimeParams === "ultimos30dias"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => changeTimePeriod("ultimos30dias")}
              />
            </View>
            <Text style={styles.options}>Últimos 30 dias</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => {
              console.log("Dispatched action:", selectedHealthParams, selectedTimeParams);
              // Não é mais necessário chamar dispatch diretamente no onPress, pois os filtros já são atualizados acima
            }}
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
