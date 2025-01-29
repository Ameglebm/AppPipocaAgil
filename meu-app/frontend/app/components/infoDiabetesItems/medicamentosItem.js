import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel
import ButtonSave from "../ButtonSave";
import Trash from "../svgComponenets/TrashSvg";
import Edit from "../svgComponenets/Edit";

const MedicamentoItem = () => {
  const router = useRouter();
  const tipoDeInsulinaItem = data.find((item) => item.id === "4"); // Busca o item com id === '4' no array de dados
  // Garante que `formData` sempre tenha um valor válido
  const formData = useSelector((state) => state.medication?.formData || []);

  // Obtém o nome do medicamento salvo, garantindo um fallback seguro
  const nomeDoMedicamento = formData.find((item) => item.id === 1)?.value || "";

  // Simula uma ação de salvar (pode ser adaptado para integração com API)
  const handleSave = () => {
    console.log("salvo");
  };

  return (
    <View>
      <View style={styles.container}>
        {nomeDoMedicamento ? (
          <>
            <View style={{ backgroundColor: "#FDFDFD" }}>
              <View style={styles.header}>
                <Text style={styles.title}>Medicamentos</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.nomeMedicamento}>{nomeDoMedicamento}</Text>
                <TouchableOpacity>
                  <Edit />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Trash />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>{tipoDeInsulinaItem.title}</Text>
            </View>

            <View style={styles.contentBtn}>
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => {
                  router.navigate("../../screens/addMedication");
                }}
              >
                <Text style={styles.btnText}>Adicionar medicamento</Text>
                <Image source={require("../../assets/images/plus.png")} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <ButtonSave onPress={handleSave} />
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
});
