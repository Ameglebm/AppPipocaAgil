import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
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
  const medicamentosItem = data.find((item) => item.id === "4"); // Busca o item com id === '4' no array de dados

  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const medicamentos = useSelector(
    (state) => state.medication.medicamentos || []
  ); // Obtém o estado do Redux
  console.log("Medicamentos armazenados no Redux", medicamentos); // Para depuração

  const ultimoMedicamento =
    medicamentos.find((med) => med.id === params?.id) ||
    medicamentos[medicamentos.length - 1] ||
    null;

  const handleSave = () => {
    console.log("salvo");
  };

  const editMedication = () => {
    console.log("Editando", ultimoMedicamento);
    if (ultimoMedicamento) {
      router.push({
        pathname: "../../screens/addMedication",
        params: {
          id: ultimoMedicamento.id,
          name: ultimoMedicamento.name,
          treatment: ultimoMedicamento.treatment,
          dosageAdm: ultimoMedicamento.dosageAdm,
          unit: ultimoMedicamento.unit,
          doseLeft: ultimoMedicamento.doseLeft,
          isEditing: true,
        },
      });
    }
  };

  const deleteMedication = () => {
    if (ultimoMedicamento) {
      dispatch(removeMedication(ultimoMedicamento.id));
      console.log("Removendo", ultimoMedicamento);
    } else {
      console.warn("Nenhum medicamento para remover");
    }
  };

  return (
    <View>
      {medicamentos.length > 0 ? (
        <>
          <View style={{ backgroundColor: "#FDFDFD" }}>
            <View style={styles.configuredHeader}>
              <Text style={styles.title}>Medicamentos</Text>
            </View>

            <ScrollView style={styles.test}>
              {medicamentos.map((medicamento) => {
                return (
                  <View
                    key={medicamento.id}
                    style={styles.configuredContainerMedication}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.nomeMedicamento}>
                        {medicamento.name}
                      </Text>
                      <Text style={styles.useText}>Uso contínuo</Text>
                    </View>

                    <View style={styles.containerEditDel}>
                      <TouchableOpacity onPress={editMedication}>
                        <Edit />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={deleteMedication}>
                        <Trash />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.btnAddMedication}
                onPress={() => {
                  dispatch(resetMedication());
                  router.navigate("../../screens/addMedication");
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
  test: { height: 200 },
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
