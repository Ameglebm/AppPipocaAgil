// Este arquivo é responsável por renderizar a interface visual da tela de id === 3 do carrossel.
// As propriedades do array (título, altura, tipos de diabetes, etc.) são utilizadas aqui para construir os elementos que o usuário vê.
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel
import { SafeAreaProvider } from "react-native-safe-area-context";
import ButtonSave from "../ButtonSave";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MetaGlicemicaScreen = ({ scrollToNextSlide }) => {
  // Busca o item com id === '3' no array de dados
  const metaGlicemica = data.find((item) => item.id === "3");

  const userId = useSelector((state) => state.auth.userId);

  // Define os rótulos para os diferentes momentos glicêmicos
  const text = [
    { id: "1", text: "Em jejum" },
    { id: "2", text: "Pré-Refeição" },
    { id: "3", text: "Pós-Refeição" },
    { id: "4", text: "Noturno" },
  ];

  // Estado para armazenar os valores inseridos pelo usuário
  const [valores, setValores] = useState([
    { minimo: "", ideal: "", maximo: "" },
    { minimo: "", ideal: "", maximo: "" },
    { minimo: "", ideal: "", maximo: "" },
    { minimo: "", ideal: "", maximo: "" },
  ]);

  // Atualiza o estado com os valores alterados pelo usuário
  const handleChange = (index, key, value) => {
    if (value === "") {
      const updatedValores = [...valores];
      updatedValores[index][key] = value;
      setValores(updatedValores);
      return;
    }

    // Verifica se o valor contém apenas números e se não é inválido (ex: 00000000)
    const regex = /^[1-9][0-9]*$|^0$/; // Permite números sem zeros à esquerda, exceto 0
    if (!regex.test(value)) {
      console.log("Valor inválido. Não pode começar com zeros.");
      return; // Não atualiza o estado se for inválido
    }

    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 999) {
      const updatedValores = [...valores];
      updatedValores[index][key] = value;
      setValores(updatedValores);
    } else {
      console.log("Valor deve ser entre 0 e 999");
    }
  };

  // Simula uma ação de salvar (pode ser adaptado para integração com API)
  const handleSave = async () => {
    if (!userId) {
      console.error("Erro: userId não encontrado.");
      return;
    }

    try {
      // Recupera o token do AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("Erro: Token de autenticação não encontrado.");
        return;
      }

      // Cria o payload da requisição
      const payload = valores.map((valor, index) => ({
        userId,
        periodoId: Number(text[index]?.id) || 0,
        metaMin: Number(valor?.minimo) || 0,
        metaIdeal: Number(valor?.ideal) || 0,
        metaMax: Number(valor?.maximo) || 0,
      }));

      console.log("Enviando payload:", payload);

      // Faz a requisição com o token de autenticação
      const { data } = await api.post("/medicalRecord/metaGlicemica", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dados enviados com sucesso!", data);
      scrollToNextSlide();
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message || "Erro desconhecido"
      );
    }
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 10;

  return (
    <SafeAreaProvider>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.container}
        >
          {/* Cabeçalho com título e descrição */}
          <View style={styles.header}>
            <Text style={styles.title}>{metaGlicemica.title}</Text>
            {metaGlicemica.description && (
              <Text style={styles.description}>
                {metaGlicemica.description}
              </Text>
            )}
          </View>

          {/* Mapeia os rótulos e renderiza os campos de entrada */}
          {text.map((item, index) => (
            <View key={item.id} style={styles.inputSet}>
              {/* Renderiza os campos de entrada para valores mínimo, ideal e máximo */}
              {index === 0 && (
                <View style={styles.labelsContainer}>
                  <Text style={styles.labelText}>Min</Text>
                  <Text style={styles.labelText}>Ideal</Text>
                  <Text style={styles.labelText}>Máx</Text>
                </View>
              )}

              <View style={styles.inputsNumbers}>
                {/* Exibe o texto que descreve o momento glicêmico */}
                <View>
                  <Text style={styles.textGroup}>{item.text}</Text>
                </View>

                <View style={styles.inputContainer}>
                  {/* Campos de entrada para valores */}
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={valores[index].minimo}
                      onChangeText={(value) =>
                        handleChange(index, "minimo", value)
                      }
                      placeholder="-"
                      placeholderTextColor="#B1B0AF"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={valores[index].ideal}
                      onChangeText={(value) =>
                        handleChange(index, "ideal", value)
                      }
                      placeholder="-"
                      placeholderTextColor="#B1B0AF"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={valores[index].maximo}
                      onChangeText={(value) =>
                        handleChange(index, "maximo", value)
                      }
                      placeholder="-"
                      placeholderTextColor="#B1B0AF"
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </KeyboardAvoidingView>

        <ButtonSave onPress={handleSave} />
      </ScrollView>
    </SafeAreaProvider>
  );
};

MetaGlicemicaScreen.propTypes = {
  scrollToNextSlide: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 352,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 6,
    gap: 24,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 24,
    gap: 16,
    alignSelf: "stretch",
  },
  title: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 22,
  },
  description: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#282828",
    lineHeight: 21,
    textAlign: "left",
  },
  inputSet: {
    width: "100%", // Garante que o inputSet ocupe toda a largura
    flexDirection: "column", // Organiza os inputs na coluna
    gap: 16, // Espaçamento entre os grupos de inputs
    alignItems: "flex-start", // Alinha os grupos de inputs à esquerda
  },
  labelsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 38,
    paddingRight: 20,
  },
  labelText: {
    color: "#282828",
    fontFamily: "Lato_700Bold",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 16,
  },
  inputsNumbers: {
    flexDirection: "row", // Itens dispostos lado a lado
    width: "100%",
    justifyContent: "space-between",
  },
  textGroup: {
    color: "#282828",
    fontFamily: "Urbanist_400Regular",
    paddingTop: 10,
    fontSize: 16,
    lineHeight: 17.6,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "Lato_700Bold",
    lineHeight: 16,
    textAlign: "center",
  },
  inputGroup: {
    paddingBottom: 24,
    flexDirection: "column",
  },
  input: {
    width: 56,
    height: 40,
    textAlign: "center",
    backgroundColor: "#FDFDFD", // Cor de fundo
    borderRadius: 8, // Raio de borda
    elevation: 1,
  },
});

export default MetaGlicemicaScreen;
