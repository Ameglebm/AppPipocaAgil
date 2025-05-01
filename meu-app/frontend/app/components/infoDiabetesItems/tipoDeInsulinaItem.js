// Bibliotecas externas
import React, { useState, useCallback  } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// Redux
import { fetchInsulinas, deleteInsulin } from "../../reducers/insulinActions";

// Dados
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel

// Componentes
import ButtonSave from "../buttons/ButtonSave";
import Button from "../buttons/Button";
import Trash from "../SvgComponents/Trash";
import Edit from "../SvgComponents/Edit";
import ConfirmationModal from "../modals/ConfirmationModal";

// Assets
import plusIcon from "../../assets/images/icons/plus.png";

const TipoDeInsulinaItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = String(useSelector((state) => state.auth.userId));
  const insulinas = useSelector((state) => state.insulin.insulinas);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInsulin, setSelectedInsulin] = useState(null);

  // Carrega insulinas ao focar na tela
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        if (userId) dispatch(fetchInsulinas(userId));
      }, 150); // dá tempo do PATCH ser refletido no banco
  
      return () => clearTimeout(timeout);
    }, [userId])
  );
  
 
  // Busca e estados globais
  const tipoDeInsulinaItem = data.find((item) => item.id === "5"); // Busca o item com id === '5' no array de dados

  console.log("Insulinas armazenadas no Redux", insulinas); // Para depuração

  // Funções de manipulação de dados
  const handleSave = () => {
    router.push("../../screens/homeScreen");
  };

  const handleDeleteConfirm = () => {
    if (selectedInsulin && userId) {
      dispatch(deleteInsulin(selectedInsulin.id, userId));
      setModalVisible(false);
      setSelectedInsulin(null);
    }
  };

  const handleEdit = (insulina) => {
    if (insulina) {
      router.push({
        pathname: "../../screens/addInsulin",
        params: {
          id: insulina.id,
          name: insulina.name,
          unity: insulina.unity,
          dosage: insulina.dosagemQtd,
          isEditing: true,
        },
      });
    }
  };;

  return (
    <View>
      {insulinas.length > 0 ? (
        <>
          <View style={{ backgroundColor: "#FDFDFD" }}>
            <View style={styles.configuredHeader}>
              <Text style={styles.title}>Insulinas</Text>
            </View>

            {insulinas.map((insulina, index) => {

              return (
                <View
                  key={insulina.id ?? index}
                  style={styles.configuredContainerInsulin}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.nomeInsulin}>{insulina.insulina|| 'Insulina não encontrada'}</Text>
                    <Text style={styles.useText}>Uso contínuo</Text>
                  </View>

                  <View style={styles.containerEditDel}>
                    <TouchableOpacity onPress={() => handleEdit(insulina)}>
                      <Edit />
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => {
                     setSelectedInsulin(insulina);
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
        onConfirm={handleDeleteConfirm}
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
