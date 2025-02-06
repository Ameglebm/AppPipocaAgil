import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  removeMedication,
  resetMedication,
} from "../../reducers/medicationActions";

import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel
import ButtonSave from "../ButtonSave";
import Button from "../Button";
import Trash from "../SvgComponents/Trash";
import Edit from "../SvgComponents/Edit";
import plusImage from "../../assets/images/plus.png";

const MedicamentoItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const medicamentosItem = data.find((item) => item.id === "4");
  
  // Pegando a lista de medicamentos do Redux
  const medicamentos = useSelector((state) => state.medication?.medicamentos || []);

  const handleSave = () => {
    console.log("salvo");
  };

  const editMedication = () => {
    router.push("../../screens/addMedication");
  };

  const deleteMedication = (index) => {
    dispatch(removeMedication(index));
  };

  return (
    <View>
      {medicamentos.length > 0 ? (
        <>
          <View style={{ backgroundColor: "#FDFDFD" }}>
            <View style={styles.configuredHeader}>
              <Text style={styles.title}>Medicamentos</Text>
            </View>

            {/* Lista todos os medicamentos */}
            {medicamentos.map((medicamento, index) => {
              const nomeDoMedicamento = medicamento.find(item => item.id === 1)?.value || "";
              
              return (
                <View key={index} style={styles.configuredContainerMedication}>
                  <View style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  }}>
                    <Text style={styles.nomeMedicamento}>{nomeDoMedicamento}</Text>
                    <Text style={styles.useText}>Uso contínuo</Text>
                  </View>

                  <View style={styles.containerEditDel}>
                    <TouchableOpacity onPress={editMedication}>
                      <Edit />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteMedication(index)}>
                      <Trash />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <View style={{ marginTop: 230, alignItems: "center" }}>
              <TouchableOpacity
                style={styles.btnAddMedication}
                onPress={() => {
                  dispatch(resetMedication());
                  router.push("../../screens/addMedication");
                }}
              >
                <Text style={styles.textBtnAddMedication}>
                  Adicionar medicamento
                </Text>
              </TouchableOpacity>
              <Button style={{ width: 320, height: 42 }} title={"Avançar"} />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{medicamentosItem.title}</Text>
            </View>

            <View style={styles.contentBtn}>
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => {
                  dispatch(resetMedication());
                  router.navigate("../../screens/addMedication");
                }}
              >
                <Text style={styles.btnText}>Adicionar medicamento</Text>
                <Image source={plusImage} />
              </TouchableOpacity>
            </View>
          </View>
          <ButtonSave onPress={handleSave} />
        </>
      )}
    </View>
  );
};

export default MedicamentoItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 18,
    marginBottom: 232,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    paddingBottom: 20,
  },
  title: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 22,
  },
  contentBtn: {
    backgroundColor: "#FDFDFD",
    width: 320,
    height: 32,
    borderRadius: 16,
    paddingTop: 4,
    paddingHorizontal: 12,
    elevation: 1,
  },
  btnAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#282828",
  },
  nomeMedicamento: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
  configuredHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: 16,
  },
  configuredContainerMedication: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDF3FF",
    padding: 16,
    borderRadius: 16,
  },
  useText: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
  },
  btnAddMedication: {
    width: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnAddMedication: {
    color: "#5E5D5C",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
  },
  containerEditDel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingRight: 5,
  },
});
