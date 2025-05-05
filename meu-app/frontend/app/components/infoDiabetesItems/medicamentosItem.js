// Bibliotecas externas
import React, { useState, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// Redux
import { fetchMedications, deleteMedications } from "../../reducers/medicationActions";

// Dados
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel

// Componentes
import Button from "../buttons/Button";
import ButtonSave from "../buttons/ButtonSave";
import Edit from "../SvgComponents/Edit";
import Trash from "../SvgComponents/Trash";
import ConfirmationModal from "../modals/ConfirmationModal";

// Assets
import plusImage from "../../assets/images/icons/plus.png";

const MedicamentoItem = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = String(useSelector((state) => state.auth.userId));
  const medicamentos = useSelector((state) => state.medication.medicamentos);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  // Carrega Medicamentos ao focar na tela
  useFocusEffect(
  useCallback(() => {
    const timeout = setTimeout(() => {
      if (userId) dispatch(fetchMedications(userId));
    }, 150); // dá tempo do PATCH ser refletido no banco

    return () => clearTimeout(timeout);
  }, [userId])
  );

  // Busca e estados globais
  const medicamentosItem = data.find((item) => item.id === "4"); // Busca o item com id === '4' no array de dados
  
  console.log("Medicamentos armazenados no Redux", medicamentos); // Para depuração
  
  // Funções de manipulação de dados
  const handleSave = () => {
    console.log("salvo");
  };

  const handleDeletePress = () => {
    if (selectedMedication && userId) {
      dispatch(deleteMedications(selectedMedication.id, userId));
      setModalVisible(false);
      setSelectedMedication(null);
    }
  };    

  const editMedication = (medicamento) => {
    if (medicamento) {
      router.push({
        pathname: "../../screens/addMedication",
        params: {
          id: medicamento.id,
          name: medicamento.name,
          treatment: medicamento.treatment,
          dosageAdm: medicamento.dosageAdm,
          unit: medicamento.unit,
          doseLeft: medicamento.doseLeft,
          isEditing: true,
        },
      });
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

            {medicamentos.map((medicamento, index) => {

              return (
                <View
                  key={medicamento.id ?? index}
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
                    {medicamento.medicamento|| 'Medicamento não encontrado'}
                    </Text>
                    <Text style={styles.useText}>Uso contínuo</Text>
                  </View>

                  <View style={styles.containerEditDel}>
                    <TouchableOpacity onPress={() => editMedication(medicamento)}>
                      <Edit />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                     setSelectedMedication(medicamento);
                     setModalVisible(true);
                   }}
                    >
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
      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeletePress}
        title="Confirmar exclusão do medicamento?"
        message="Esta ação não pode ser desfeita."
      />
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
