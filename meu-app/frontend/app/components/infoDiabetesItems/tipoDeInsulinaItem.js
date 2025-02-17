// Bibliotecas externas
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { removeInsulin } from "../../reducers/insulinActions";

// Dados
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel

// Componentes
import ButtonSave from "../ButtonSave";
import Button from "../Button";
import Trash from "../SvgComponents/Trash";
import Edit from "../SvgComponents/Edit";
import ConfirmationModal from '../ConfirmationModal';

// Assets
import plusIcon from "../../assets/images/plus.png";

const TipoDeInsulinaItem = () => {
  // Obtém depêndencias
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const router = useRouter();

  // Busca e estados globais
  const tipoDeInsulinaItem = data.find((item) => item.id === "5"); // Busca o item com id === '5' no array de dados
  const insulinas = useSelector((state) => state.insulin.insulinas);

  console.log("Insulinas armazenadas no Redux", insulinas); // Para depuração

  // Obtém a última insulina adicionada
  const ultimaInsulina =
    insulinas.find((ins) => ins.id === params?.id) ||
    insulinas[insulinas.length - 1] ||
    null;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInsulin, setSelectedInsulin] = useState(null);

  // Funções de manipulação de dados
  const handleSave = () => {
    console.log("salvo");
    router.push("../../screens/homeScreen");
  };

  const editInsulin = () => {
    console.log("Editando", ultimaInsulina);
    if (ultimaInsulina) {
      router.push({
        pathname: "../../screens/addInsulin",
        params: {
          id: ultimaInsulina.id,
          name: ultimaInsulina.name,
          unity: ultimaInsulina.unity,
          dosage: ultimaInsulina.dosage,
          isEditing: true,
        },
      });
    }
  };

  /*const deleteInsulin = () => {
    if (ultimaInsulina) {
      dispatch(removeInsulin(ultimaInsulina.id));
      console.log("Removendo", ultimaInsulina);
    } else {
      console.warn("Nenhuma insulina para remover");*/

  const handleDeletePress = (insulina) => {
    setSelectedInsulin(insulina);
    setModalVisible(true);
  };

  const deleteInsulin = () => {
    if (selectedInsulin) {
      dispatch(removeInsulin(selectedInsulin.id));
      setModalVisible(false);
      setSelectedInsulin(null);
      console.log(`O item ${selectedInsulin.name} foi removido!`)
    }
  };

  return (
    <View>
      {insulinas.length > 0 ? (
        <>
          <View style={{ backgroundColor: "#FDFDFD" }}>
            <View style={styles.configuredHeader}>
              <Text style={styles.title}>Insulinas</Text>
            </View>

            {insulinas.map((insulina) => {
              return (
                <View
                  key={insulina.id}
                  style={styles.configuredContainerInsulin}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.nomeInsulin}>{insulina.name}</Text>
                    <Text style={styles.useText}>Uso contínuo</Text>
                  </View>

                  <View style={styles.containerEditDel}>
                    <TouchableOpacity onPress={editInsulin}>
                      <Edit />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDeletePress(insulina)}>
                      <Trash />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <View style={styles.contentBtnFixed}>
              <TouchableOpacity
                style={styles.btnAddInsulin}
                onPress={() => router.push("../../screens/addInsulin")}
              >
                <Text style={styles.textBtnAddInsulin}>Adicionar insulina</Text>
              </TouchableOpacity>
              <Button style={{ width: 320, height: 42 }} title={"Avançar"} />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{tipoDeInsulinaItem.title}</Text>
            </View>

            <View style={styles.contentBtn}>
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => {
                  router.navigate("../../screens/addInsulin");
                }}
              >
                <Text style={styles.btnText}>Adicionar Insulina</Text>
                <Image source={plusIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <ButtonSave onPress={handleSave} />
        </>
      )}

      <ConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={deleteInsulin}
        title="Confirmar exclusão de insulina?"
        message="Esta ação não pode ser desfeita."
      />
    </View>
  );
};

export default TipoDeInsulinaItem;

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
  configuredContainerInsulin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDF3FF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  nomeInsulin: {
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
  btnAddInsulin: {
    width: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnAddInsulin: {
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
