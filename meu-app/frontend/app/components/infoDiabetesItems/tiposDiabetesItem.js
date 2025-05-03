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
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ButtonSave from "../buttons/ButtonSave";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

export default function TiposDiabetesItem({ item, scrollToNextSlide }) {
  const isTipoDiabetesScreen = item.id === "1"; // Verifica se o slide atual é o da tela de tipos de diabetes
  // Define os tipos de diabetes disponíveis, caso seja a tela correta
  const diabetesTypes = isTipoDiabetesScreen ? item.types : [];

  // Estado para controlar qual tipo de diabetes está selecionado
  const [selectedType, setSelectedType] = useState(0);

  // Obtém o userId do estado Redux com validação
  const userId = useSelector((state) => state.auth.userId);
  const [error, setError] = useState(null);

  //Função para buscar os dados do usuário
  useEffect(() => {
    const fetchSavedDiabetes = async () => {
      if (!isTipoDiabetesScreen || !userId) return;

      try {
        const token = await AsyncStorage.getItem("authToken");

        const response = await api.get(`/medicalRecord/diabetes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.diabetesId) {
          const savedType = diabetesTypes.find(
            (type) => type.id === response.data.diabetesId
          );
          if (savedType) setSelectedType(savedType);
        }
      } catch (error) {
        console.error("Erro ao buscar tipo de diabetes salvo:", error);
        setError("Não foi possível carregar o tipo de diabetes salvo.");
      }
    };

    fetchSavedDiabetes();
  }, [userId, isTipoDiabetesScreen]);

  const handleSelectType = (type) => {
    setSelectedType((prev) => (prev?.id === type.id ? 0 : type));
  };


  // Função para salvar os dados na API
  const handleSave = async () => {
    let payload;

    console.log(payload);
    
    if (!userId) {
      setError("Usuário não autenticado. Por favor, faça login novamente.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!selectedType) {
        setError("Por favor, selecione um tipo de diabetes.");
        return;
      }

      // Formatação específica do payload
      payload = {
        userId,
        diabetesId: selectedType.id,
      };

      console.log("Iniciando requisição para a API...", payload);
      const response = await api.post("/medicalRecord/diabetes", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adiciona header explícito
        },
      });

      switch (response.status) {
        case 201:
          console.log("Tipo de diabetes registrado com sucesso!");
          setError(null);
          scrollToNextSlide();
          break;

        case 400:
          setError("Erro de validação! Verifique os dados enviados.");
          break;

        case 500:
          setError("Erro interno do servidor");
          break;

        default:
          setError(`Erro inesperado: ${response.status}`);
          break;
      }
    } catch (error) {
      console.error("❌ ERRO NO PROCESSO DE SALVAMENTO:", {
        mensagemErro: error.message,
        dadosResposta: error.response?.data,
        statusCode: error.response?.status,
        payloadEnviado: payload,
        headerEnviado: error.config?.headers,
      });

      setError(
        error.response?.data?.message ||
          "Erro ao salvar. Por favor, tente novamente."
      );
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
        {error && <Text style={styles.errorText}>{error}</Text>}
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
                    selectedType?.id === item.id &&
                      styles.selectedTypeContainer, // Aplica estilo ao item selecionado
                  ]}
                  onPress={() => handleSelectType(item)} // Seleciona o tipo ao pressionar
                >
                  <Text
                    style={[
                      styles.typeText,
                      selectedType?.id === item.id && styles.selectedTypeText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()} // Define uma chave única para cada item da lista
          />
        )}
      </View>
      <ButtonSave onPress={handleSave} />
    </ScrollView>
  );
}

// Validação de props
TiposDiabetesItem.propTypes = {
  scrollToNextSlide: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired, // id é obrigatório e deve ser uma string
    title: PropTypes.string,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired, // item é obrigatório
};

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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
