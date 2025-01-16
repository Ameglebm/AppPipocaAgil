// Bibliotecas externas
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import Checkbox from "expo-checkbox";

// Estilos
import styles from "../assets/styles/settingsSchedules";

// Componentes
import Button from "../components/Button";
import CustomHeader from "../components/CustomHeader";
import ModalClock from "../components/modalClock";

// Icones e svgs
import Plus from "../components/svgComponenets/Plus";
import Trash from "../components/svgComponenets/TrashSvg";

export default function SettingsSchedules() {
  // Lógica para renderizar os dias
  // Estado inicial que armazena os dias da semana como objetos.
  const [days, setDays] = useState([
    { day: "D", selected: false },
    { day: "S", selected: false },
    { day: "T", selected: false },
    { day: "Q", selected: false },
    { day: "Q", selected: false },
    { day: "S", selected: false },
    { day: "S", selected: false },
  ]);

  const toggleSelectAll = () => {
    const allSelected = days.every((day) => day.selected); // Verifica se todos os elementos no array "days" tem "selected" igual a "true"
    setDays(
      days.map((day) => ({
        //setDays atualiza o estado retornado por map, O método map cria um novo array
        ...day, // Copia as propriedades existentes de day
        selected: !allSelected,
      }))
    ); // Inverte o estado de `selected`.
  };

  const toggleDaySelection = (index) => {
    const newDays = [...days]; // Cria uma cópia superficial do array days usando o spread operator (...).
    newDays[index].selected = !newDays[index].selected; // Acessar a propriedade selected do array newDays dentro do indice e alterar seu valor entre true ou false
    setDays(newDays); // Atualiza o estado days com a cópia modificada, disparando uma re-renderização do componente
  };

  // Lógica para adicionar ou remover o campo de dose
  const [doses, setDoses] = useState([{ id: 1, time: null }]);

  const addDose = () => {
    setDoses((prevDoses) => [
      ...prevDoses,
      { id: prevDoses.length + 1, time: null },
    ]);
  };

  const removeDose = (id) => {
    setDoses((prevDoses) => prevDoses.filter((dose) => dose.id !== id));
  };

  // Lógica para captar o horário selecionado pelo usuário
  const [selectedTimes, setSelectedTimes] = useState([]); // Armazena os horários selecionados

  const handleTimeChange = (time) => {
    setSelectedTimes((prevTimes) => [...prevTimes, time]); // Adiciona horário ao array
  };

  // Lógica da API
  const handleSubmit = async () => {
    const selectedDays = days
      .filter((day) => day.selected)
      .map((day) => day.day);

    if (selectedDays.length === 0 || selectedTimes.length === 0) {
      Alert.alert(
        "Erro",
        "Por favor, selecione pelo menos um dia e um horário."
      );
      return;
    }

    const payload = {
      days: selectedDays,
      times: selectedTimes, // Envia todos os horários selecionados
    };

    try {
      console.log("Enviando payload:", payload);
      const response = await axios.post(
        "https://sua-api.com/endpoint",
        payload
      );
      console.log("Resposta da API:", response);

      if (response.data) {
        // Sucesso: Exibe a mensagem baseada na resposta
        Alert.alert("Sucesso", "Configurações salvas com sucesso!");
      } else {
        // Caso o formato da resposta não seja o esperado
        Alert.alert("Erro", "Resposta inesperada da API.");
      }
    } catch (error) {
      console.error("Erro na API:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 50, paddingBottom: 16 }}>
        <CustomHeader title={"Configurar horários"} />
      </View>

      <View style={{ alignItems: "center" }}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecione os dias da semana</Text>
          <TouchableOpacity
            onPress={toggleSelectAll}
            style={styles.selectAllButton}
          >
            <Text style={styles.selectAllButtonText}>Selecionar todos</Text>
          </TouchableOpacity>
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <View
                key={index} // O índice do array é usado como chave única para cada elemento renderizado.
                style={styles.dayContainer}
              >
                <Text style={styles.dayText}>{day.day}</Text>
                <Checkbox
                  value={day.selected} // Determina o estado inicial do checkbox.
                  onValueChange={() => toggleDaySelection(index)} // o evento onValueChange será acionado quando o valor do componente mudar, e ao ser acionado, ele chamará a função toggleDaySelection com o índice (index) como argumento.
                  style={styles.checkbox}
                  color={day.selected ? "#5A74FA" : undefined} // Define a cor quando marcado
                />
              </View>
            ))}
          </View>
        </View>
        <View>
          {doses.map((dose, index) => (
            <View key={dose.id} style={{ marginBottom: 18 }}>
              <Text style={styles.textDose}>{`${dose.id}ª Dose`}</Text>
              <ModalClock
                onTimeChange={(time) => handleTimeChange(dose.id, time)}
              />
              {dose.id > 1 && (
                <TouchableOpacity
                  onPress={() => removeDose(dose.id)}
                  style={styles.deleteButton}
                >
                  <Trash />
                </TouchableOpacity>
              )}
              {index == doses.length - 1 && (
                <TouchableOpacity style={styles.btnAdd} onPress={addDose}>
                  <Plus style={styles.imagePlus} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <Button
            title={"Salvar"}
            onPress={handleSubmit}
            style={[
              styles.buttonSave,
              doses.length == 1 && { position: "relative", marginTop: 105 },
              doses.length == 2 && { position: "relative", marginTop: 20 },
              doses.length >= 3 && { position: "relative", marginBottom: 16 },
            ]}
          />
        </View>
      </View>
    </ScrollView>
  );
}
