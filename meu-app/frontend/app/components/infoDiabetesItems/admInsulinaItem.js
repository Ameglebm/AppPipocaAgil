// Este arquivo é responsável por renderizar a interface visual da tela de id === 2 do carrossel.
// As propriedades do array (título, altura, tipos de diabetes, etc.) são utilizadas aqui para construir os elementos que o usuário vê.
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonSave from "../ButtonSave";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export default function AdmInsulinaItem({ item, scrollToNextSlide }) {
  const isTipoDiabetesScreen = item.id === "2";

  const userId = useSelector((state) => state.auth.userId);

  const diabetesTypes = isTipoDiabetesScreen ? item.types : [];

  // Estado para controlar o tipo selecionado
  const [selectedType, setSelectedType] = useState(0);

  // Função para selecionar o tipo de diabetes
  const handleSelectType = (id) => {
    setSelectedType((prev) => (prev === id ? 0 : id));
  };

  // Simula uma ação de salvar (pode ser adaptado para integração com API)
  const handleSave = async () => {
    if (!userId) {
      console.error("Erro: userId não encontrado");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("Erro: Token de autenticação não encontrado.");
        return;
      }

      const payload = {
        userId,
        adminInsulinaId: selectedType,
      };

      console.log("Enviando payload:", payload);

      const response = await api.post("/medicalRecord/adminInsulina", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      switch (response.status) {
        case 201:
          console.log("Adminstração de insulina registrada com sucesso!");
          scrollToNextSlide();
          break;

        case 400:
          console.error("Erro de validação! Verifique os dados enviados.");
          break;

        case 500:
          console.error("Erro interno do servidor");
          break;

        default:
          console.error("Resposta inesperada do servidor", response.status);
          break;
      }
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text
          style={[styles.title, isTipoDiabetesScreen && { paddingBottom: 26 }]}
        >
          {item.title}
        </Text>
        {isTipoDiabetesScreen && (
          <FlatList
            data={diabetesTypes}
            renderItem={({ item }) => (
              <View style={styles.list}>
                <TouchableOpacity
                  style={[
                    styles.typeContainer,
                    { width: 320, height: 36 }, // Ajusta a largura de cada item para ocupar toda a tela com margens
                    selectedType === item.id && styles.selectedTypeContainer,
                  ]}
                  onPress={() => handleSelectType(item.id)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      selectedType === item.id && styles.selectedTypeText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(type, index) => index.toString()}
          />
        )}
      </SafeAreaView>
      <ButtonSave onPress={handleSave} />
    </SafeAreaProvider>
  );
}

// Validação de props
AdmInsulinaItem.propTypes = {
  scrollToNextSlide: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired, // id é obrigatório e deve ser uma string
    title: PropTypes.string,
    typeOne: PropTypes.string,
    typeTwo: PropTypes.string,
    typeThree: PropTypes.string,
    typeFour: PropTypes.string,
    typeFive: PropTypes.string,
    typeSix: PropTypes.string,
  }).isRequired, // item é obrigatório
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 2,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
  },
  title: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 22,
  },
  typeContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: "#FDFDFD",
  },
  list: {
    paddingBottom: 8,
  },
  selectedTypeContainer: {
    backgroundColor: "#7A98FF", // Cor de destaque para o item selecionado
  },
  typeText: {
    color: "#282828",
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 21,
  },
  selectedTypeText: {
    color: "#FDFDFD", // Cor de destaque do texto selecionado
  },
});
