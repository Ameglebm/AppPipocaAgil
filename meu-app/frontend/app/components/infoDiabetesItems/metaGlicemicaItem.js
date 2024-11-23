// Este arquivo é responsável por renderizar a interface visual da tela de id === 3 do carrossel.
// As propriedades do array (título, altura, tipos de diabetes, etc.) são utilizadas aqui para construir os elementos que o usuário vê.
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import data from "../slidesInfoDiabetes"; // Importa o array com os dados para o carrossel
import { SafeAreaProvider } from "react-native-safe-area-context";
import ButtonSave from "../ButtonSave";
import AlertToggle from "../alertToggle";

const MetaGlicemicaScreen = () => {
  // Busca o item com id === '3' no array de dados
  const metaGlicemica = data.find((item) => item.id === "3");

  // Estado para armazenar os valores inseridos pelo usuário
  const [valores, setValores] = useState([
    { minimo: "", ideal: "", maximo: "" },
    { minimo: "", ideal: "", maximo: "" },
    { minimo: "", ideal: "", maximo: "" },
    { minimo: "", ideal: "", maximo: "" },
  ]);

  // Atualiza o estado com os valores alterados pelo usuário
  const handleChange = (index, key, value) => {
    const updatedValores = [...valores];
    updatedValores[index][key] = value;
    setValores(updatedValores);
  };

  /* Simula uma ação de salvar (pode ser adaptado para integração com API)
  const handleSave = () => {
    // API
    console.log("/", valores);
  };
  */

  // Define os rótulos para os diferentes momentos glicêmicos
  const text = [
    { id: "1", text: "Em jejum" },
    { id: "2", text: "Pré-Refeição" },
    { id: "3", text: "Pós-Refeição" },
    { id: "4", text: "Noturno" },
  ];

  return (
    <SafeAreaProvider>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                <View style={styles.textContainer}>
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
        <AlertToggle />
        <ButtonSave />
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 352,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 29,
    gap: 24,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
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
    gap: 8, // Espaçamento entre os itens
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {},
  textGroup: {
    color: "#282828",
    fontFamily: "Urbanist_400Regular",
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
    gap: 16,
    flexDirection: "column",
  },
  input: {
    width: 56,
    height: 40,
    textAlign: "center",
    backgroundColor: "#FDFDFD", // Cor de fundo
    borderRadius: 8, // Raio de borda
    shadowColor: "rgba(15, 15, 15, 0.12)", // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Deslocamento da sombra para iOS
    shadowOpacity: 1, // Opacidade da sombra para iOS
    shadowRadius: 1, // Raio da sombra para iOS
    elevation: 5, // Elevação da sombra para Android
  },
});

export default MetaGlicemicaScreen;
