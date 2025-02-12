// Bibliotecas externas
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
  removeMedication,
  resetMedication,
} from "../../reducers/medicationActions";

// Dados
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel

// Componentes
import Button from "../Button";
import ButtonSave from "../ButtonSave";
import Edit from "../SvgComponents/Edit";
import Trash from "../SvgComponents/Trash";

// Assets
import plusImage from "../../assets/images/plus.png";

const MedicamentoItem = () => {
  // Obtém depêndencias
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const router = useRouter();

  // Busca e estados globais
  const medicamentosItem = data.find((item) => item.id === "4"); // Busca o item com id === '4' no array de dados
  const medicamentos = useSelector(
    (state) => state.medication.medicamentos || []
  ); // Obtém o estado do Redux

  console.log("Medicamentos armazenados no Redux", medicamentos); // Para depuração

  // Obtém o último medicamento adicionado
  const ultimoMedicamento =
    medicamentos.find((med) => med.id === params?.id) ||
    medicamentos[medicamentos.length - 1] ||
    null;

  // Funções de manipulação de dados
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

            <View style={styles.contentBtnFixed}>
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
  configuredHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: 16,
  },
  title: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 22,
  },
  configuredContainerMedication: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDF3FF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  nomeMedicamento: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
  useText: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
  },
  containerEditDel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingRight: 5,
  },
  contentBtnFixed: {
    position: "absolute",
    top: 330,
    left: 16,
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
});
