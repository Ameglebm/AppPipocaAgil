import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import plusIcon from "../../assets/images/plus.png";
import data from "../SlidesInfoDiabetes"; // Importa o array com os dados para o carrossel
import ButtonSave from "../ButtonSave";
import { useRouter } from "expo-router";

const TipoDeInsulinaItem = () => {
  // Busca o item com id === '4' no array de dados
  const tipoDeInsulinaItem = data.find((item) => item.id === "5");
  const router = useRouter();
  // Simula uma ação de salvar (pode ser adaptado para integração com API)
  const handleSave = () => {
    console.log("salvo");
    router.push("../../screens/HomeScreen");
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{tipoDeInsulinaItem.title}</Text>
        </View>

        <View style={styles.contentBtn}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => {
              router.navigate("../../screens/AddInsulin");
            }}
          >
            <Text style={styles.btnText}>Adicionar Insulina</Text>
            <Image source={plusIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <ButtonSave onPress={handleSave} />
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
});
