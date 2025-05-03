import React, { useState, useEffect } from "react";
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
  const dispatch = useDispatch();
  const [openOptions, setOpenOptions] = useState(false);

  // Obter filtros atuais do Redux
  const reduxHealthParams = useSelector((state) => state.filter?.selectedHealthParams || []);
  const reduxTimeParam = useSelector((state) => state.filter?.selectedTimeParams || null);

  // Estados locais (temporários)
  const [localHealthParams, setLocalHealthParams] = useState(reduxHealthParams);
  const [localTimeParam, setLocalTimeParam] = useState(reduxTimeParam);

  // Quando abrir os filtros, inicializa com os valores atuais do Redux
  useEffect(() => {
    if (openOptions) {
      setLocalHealthParams(reduxHealthParams);
      setLocalTimeParam(reduxTimeParam);
    }
  }, [openOptions]);

  const toggleCheckbox = (param) => {
    setLocalHealthParams((prev) =>
      prev.includes(param)
        ? prev.filter((item) => item !== param)
        : [...prev, param]
    );
  };

  const changeTimePeriod = (period) => {
    setLocalTimeParam(period);
  };

  const aplicarFiltros = () => {
    dispatch(setFilter(localHealthParams, localTimeParam));
    setOpenOptions(false); // Fecha dropdown após aplicar
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.filtersView} onPress={() => setOpenOptions(!openOptions)}>
        <Text style={styles.text}>Filtros</Text>
        <Image
          style={styles.contentIcon}
          source={openOptions ? ExpandLess : ExpandMore}
        />
      </TouchableOpacity>

      {openOptions && (
        <View style={styles.contentList}>
          <Text style={styles.titleOptions}>Parâmetros de Saúde</Text>

          {["peso", "glicemia", "pressaoArterial"].map((param) => (
            <View style={{ flexDirection: "row", gap: 10 }} key={param}>
              <View style={styles.checkboxWrapper}>
                <Checkbox
                  style={styles.checkbox}
                  color={localHealthParams.includes(param) ? "#2F39D3" : "#848484"}
                  value={localHealthParams.includes(param)}
                  onValueChange={() => toggleCheckbox(param)}
                />
              </View>
              <Text style={styles.options}>
                {param === "peso" ? "Peso" : param === "glicemia" ? "Glicemia" : "Pressão Arterial"}
              </Text>
            </View>
          ))}

          <Text style={styles.titleOptions}>Dias da Semana</Text>

          {[
            { label: "Última Semana", value: "ultimaSemana" },
            { label: "Últimos 15 dias", value: "ultimos15dias" },
            { label: "Últimos 30 dias", value: "ultimos30dias" },
          ].map(({ label, value }) => (
            <View style={{ flexDirection: "row", gap: 10 }} key={value}>
              <View style={styles.radioWrapper}>
                <RadioButton
                  color="#2F39D3"
                  uncheckedColor="#848484"
                  value={value}
                  status={localTimeParam === value ? "checked" : "unchecked"}
                  onPress={() => changeTimePeriod(value)}
                />
              </View>
              <Text style={styles.options}>{label}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.buttonView} onPress={aplicarFiltros}>
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
