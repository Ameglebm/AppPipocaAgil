import { View, Text, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';

export default function TiposDiabetesItem({ item }) {
  const { width } = useWindowDimensions();
  const isTipoDiabetesScreen = item.id === '2';
  const diabetesTypes = isTipoDiabetesScreen
    ? [
        item.typeOne,
        item.typeTwo,
        item.typeThree,
        item.typeFour,
        item.typeFive,
        item.typeSix,
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
      {isTipoDiabetesScreen && (
        <FlatList
          data={diabetesTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.typeContainer,
                { width: width - 40 }, // Ajusta a largura de cada item para ocupar toda a tela com margens
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
          )}
          keyExtractor={(type, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  typeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginVertical: 5,
    backgroundColor: '#FDFDFD',
    // Configuração de sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    // Configuração de sombra para Android
    elevation: 3, // Use valores baixos para uma sombra mais sutil
  },
  selectedTypeContainer: {
    backgroundColor: '#7A98FF', // Cor de destaque para o item selecionado
  },
  typeText: {
    fontSize: 18,
    color: '#333',
  },
  selectedTypeText: {
    color: '#FDFDFD', // Cor de destaque do texto selecionado
  },
});
