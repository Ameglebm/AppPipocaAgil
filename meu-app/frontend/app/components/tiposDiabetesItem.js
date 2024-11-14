import { View, Text, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';

export default function TiposDiabetesItem({ item }) {
  const { width } = useWindowDimensions();
  const isTipoDiabetesScreen = item.id === '1';
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

  // Estado para controlar o tipo selecionado
  const [selectedType, setSelectedType] = useState(null);

  // Função para selecionar o tipo de diabetes
  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isTipoDiabetesScreen && { paddingBottom: 36 }]}>{item.title}</Text>

      {isTipoDiabetesScreen && (
        <FlatList
          data={diabetesTypes}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <TouchableOpacity
              style={[
                styles.typeContainer,
                { width: 320, height: 36 }, // Ajusta a largura de cada item para ocupar toda a tela com margens
                selectedType === item && styles.selectedTypeContainer,
                ]}
                onPress={() => handleSelectType(item)}
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
            </ View>
            
          )}
          keyExtractor={(type, index) => index.toString()}
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
    backgroundColor: '#FDFDFD',
  },
  selectedTypeContainer: {
    backgroundColor: '#7A98FF', // Cor de destaque para o item selecionado
  },
  typeText: {
    color: '#282828',
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 21,
  },
  selectedTypeText: {
    color: '#FDFDFD', // Cor de destaque do texto selecionado
  },
});
