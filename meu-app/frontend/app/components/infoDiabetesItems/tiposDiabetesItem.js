// Este arquivo é responsável por renderizar a interface visual da tela de id === 1 do carrossel.
// As propriedades do array (título, altura, tipos de diabetes, etc.) são utilizadas aqui para construir os elementos que o usuário vê.
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

export default function TiposDiabetesItem({ item }) {
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

  // Estado para controlar qual tipo de diabetes está selecionado
  const [selectedType, setSelectedType] = useState(null);

  // Função que altera o estado ao selecionar um tipo
  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingHorizontal: 16,
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
