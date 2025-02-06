import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import plusIcon from "../../assets/images/plus.png";
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel
import ButtonSave from "../ButtonSave";
import Button from "../Button";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { removeInsulin, resetInsulin } from "../../reducers/insulinActions";
import Trash from "../SvgComponents/Trash";
import Edit from "../SvgComponents/Edit";

const TipoDeInsulinaItem = () => {
  // Busca o item com id === '4' no array de dados
  const tipoDeInsulinaItem = data.find((item) => item.id === "5");

  const router = useRouter();
  const dispatch = useDispatch();
  // Garante que `formData` sempre tenha um valor válido
  const formData = useSelector((state) => state.insulin?.formData || []);
  // Obtém o nome do medicamento salvo, garantindo um fallback seguro
  const nomeDaInsulina = formData.find((item) => item.id === 1)?.value || "";
  // Simula uma ação de salvar (pode ser adaptado para integração com API)
  const handleSave = () => {
    console.log("salvo");
    router.push("../../screens/homeScreen");
  };
  const editInsulin = () => {
    router.push("../../screens/addInsulin");
  };

  const deleteInsulin = () => {
    console.log("Removendo insulina com ID:", nomeDaInsulina); // Para depuração
    if (nomeDaInsulina) {
      dispatch(removeInsulin(nomeDaInsulina));
      dispatch(resetInsulin());
      console.log(formData);
    } else {
      console.warn("ID da insulina não foi passado corretamente");
    }
  };

  return (
    <View>
      {nomeDaInsulina ? (
        <>
          <View style={{ backgroundColor: "#FDFDFD" }}>
            <View style={styles.configuredHeader}>
              <Text style={styles.title}>Insulinas</Text>
            </View>

            <View style={styles.configuredContainerInsulin}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Text style={styles.nomeInsulin}>{nomeDaInsulina}</Text>
                <Text style={styles.useText}>Uso contínuo</Text>
              </View>

              <View style={styles.containerEditDel}>
                <TouchableOpacity onPress={editInsulin}>
                  <Edit />
                </TouchableOpacity>

                <TouchableOpacity onPress={deleteInsulin}>
                  <Trash />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 230, alignItems: "center" }}>
              <TouchableOpacity style={styles.btnAddInsulin}>
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
    </View>
  );
};

export default TipoDeInsulinaItem;

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
  nomeInsulin: {
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
  configuredContainerInsulin: {
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
  containerEditDel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingRight: 5,
  },
});
