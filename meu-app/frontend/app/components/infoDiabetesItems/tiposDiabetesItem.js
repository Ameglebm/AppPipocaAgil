// Este arquivo é responsável por renderizar a interface visual da tela de id === 1 do carrossel.
// As propriedades do array (título, altura, tipos de diabetes, etc.) são utilizadas aqui para construir os elementos que o usuário vê.
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonSave from "../ButtonSave";

export default function TiposDiabetesItem({ item, scrollToNextSlide }) {
  const isTipoDiabetesScreen = item.id === "1"; // Verifica se o slide atual é o da tela de tipos de diabetes
  // Define os tipos de diabetes disponíveis, caso seja a tela correta
  const diabetesTypes = isTipoDiabetesScreen
    ? [
        item.typeOne,
        item.typeTwo,
        item.typeThree,
        item.typeFour,
        item.typeFive,
        item.typeSix,
        item.typeSeven,
        item.typeEight,
      ]
    : [];

  // Validação de props
  TiposDiabetesItem.propTypes = {
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
      typeSeven: PropTypes.string,
      typeEight: PropTypes.string,
    }).isRequired, // item é obrigatório
  };

  // Estado para controlar qual tipo de diabetes está selecionado
  const [selectedType, setSelectedType] = useState(null);

  // Função que altera o estado ao selecionar um tipo
  const handleSelectType = (type) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const handleSave = () => {
    console.log("salvo", selectedType);
    if (selectedType != null) {
      scrollToNextSlide();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={[styles.title, isTipoDiabetesScreen && { paddingBottom: 36 }]}
        >
          {item.title}
        </Text>
        {/* Renderiza a lista de tipos de diabetes, caso seja a tela correspondente */}
        {isTipoDiabetesScreen && (
          <FlatList
            data={diabetesTypes} // Dados da lista
            renderItem={({ item }) => (
              <View style={styles.list}>
                {/* Renderiza cada tipo de diabetes como um botão selecionável */}
                <TouchableOpacity
                  style={[
                    styles.typeContainer,
                    { width: 320, height: 36 }, // Ajusta a largura de cada item para ocupar toda a tela com margens
                    selectedType === item && styles.selectedTypeContainer, // Aplica estilo ao item selecionado
                  ]}
                  onPress={() => handleSelectType(item)} // Seleciona o tipo ao pressionar
                >
                  <Text
                    style={[
                      styles.typeText,
                      selectedType === item && styles.selectedTypeText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(type, index) => index.toString()} // Define uma chave única para cada item da lista
          />
        )}
      </View>
      <ButtonSave onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    paddingHorizontal: 16,
    paddingBottom: 13,
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
  list: {
    paddingBottom: 8,
  },
  typeContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: "#FDFDFD",
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
