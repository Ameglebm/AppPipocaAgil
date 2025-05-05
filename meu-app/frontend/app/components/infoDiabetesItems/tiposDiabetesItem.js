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
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import ButtonSave from "../buttons/ButtonSave";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// API
import api from "../../services/api";

export default function TiposDiabetesItem({ item, scrollToNextSlide }) {
  const isTipoDiabetesScreen = item.id === "1";

  const userId = useSelector((state) => state.auth.userId);
  const [diabetesTypes, setDiabetesTypes] = useState([]);
  const [savedDiabetesId, setSavedDiabetesId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState(null);

  // Busca tipos de diabetes da API
  useEffect(() => {
    const fetchDiabetesTypes = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await api.get("/medicalRecord/typesDiabetes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setDiabetesTypes(response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar tipos de diabetes:", err);
        setError("Erro ao carregar tipos de diabetes.");
      }
    };

    if (isTipoDiabetesScreen) {
      fetchDiabetesTypes();
    }
  }, [isTipoDiabetesScreen]);

  // Busca tipo salvo para o usuário
  useFocusEffect(
    useCallback(() => {
      const fetchSavedDiabetesType = async () => {
        if (!userId) return;
  
        try {
          const token = await AsyncStorage.getItem("authToken");
          const response = await api.get(`/medicalRecord/diabetes/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response.status === 200) {
            setSavedDiabetesId(response.data.data?.diabetesId);
            console.log("Tipos de diabetes salvo no banco de dados:", response.data.data.diabetesId);
          }
        } catch (error) {
          console.error("Erro ao buscar tipo de diabetes salvo:", error);
        }
      };
  
      fetchSavedDiabetesType();
    }, [userId])
  );
  
  useEffect(() => {
    if (savedDiabetesId && diabetesTypes.length > 0) {
      const matchedType = diabetesTypes.find((type) => {
        return type.id === savedDiabetesId;
      });
      if (matchedType) {
        setSelectedType(matchedType);
      }
    }
  }, [savedDiabetesId, diabetesTypes]);
  
  const handleSelectType = (type) => {
    const isSame = selectedType?.id === type.id;
    setSelectedType((prev) => (isSame ? null : type));
  };

  const handleSave = async () => {
    let payload;
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

      payload = {
        userId,
        diabetesId: selectedType.id,
      };

      console.log("Iniciando requisição para a API...", payload);
      const response = await api.post("/medicalRecord/diabetes", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

        {isTipoDiabetesScreen && (
          <FlatList
            data={diabetesTypes}
            extraData={selectedType}
            renderItem={({ item: diabetesType }) => (
              <View style={styles.list}>
                <TouchableOpacity
                  style={[
                    styles.typeContainer,
                    { width: 320, height: 36 },
                    selectedType?.id === diabetesType.id && styles.selectedTypeContainer,
                  ]}
                  onPress={() => handleSelectType(diabetesType)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      selectedType?.id === diabetesType.id && styles.selectedTypeText,
                    ]}
                  >
                    {diabetesType.nome}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
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
