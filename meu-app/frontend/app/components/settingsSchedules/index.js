// Bibliotecas externas
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";

// Estilos
import styles from "./styles";

// Componentes
import Button from "../Button";
import CustomHeader from "../CustomHeader";
import ModalClock from "../ModalClock";

// Icones e svgs
import Plus from "../SvgComponents/Plus";
import Trash from "../SvgComponents/TrashSvg";

export default function SettingsSchedules() {
  const router = useRouter();
  // Lógica para renderizar os dias
  // Estado inicial que armazena os dias da semana como objetos.
  const [days, setDays] = useState([
    { id: 1, day: "D", selected: false },
    { id: 2, day: "S", selected: false },
    { id: 3, day: "T", selected: false },
    { id: 4, day: "Q", selected: false },
    { id: 5, day: "Q", selected: false },
    { id: 6, day: "S", selected: false },
    { id: 7, day: "S", selected: false },
  ]);

  // Mapeamento de nomes completos para os dias
  const dayMap = {
    1: "Dom",
    2: "Seg",
    3: "Ter",
    4: "Qua",
    5: "Qui",
    6: "Sex",
    7: "Sáb",
  };

  // Função para capturar os dias selecionados formatados
  const getFormattedDays = () => {
    return days.filter((day) => day.selected).map((day) => dayMap[day.id]); // Mapeia o ID para o nome completo
  };

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

  const toggleDaySelection = (id) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === id
          ? { ...day, selected: !day.selected } // Alterna o estado de 'selected' para o dia com o ID correspondente
          : day
      )
    );
  };

  // Lógica para adicionar ou remover o campo de dose
  const [doses, setDoses] = useState([{ id: 1, time: null }]);

  const addDose = () => {
    setDoses((prevDoses) => {
      const newDose = { id: prevDoses.length + 1, time: null };
      setSelectedTimes((prevTimes) => [...prevTimes, null]); // Adiciona um novo `null` ao array
      return [...prevDoses, newDose];
    });
  };

  const removeDose = (id) => {
    setDoses((prevDoses) => {
      const updatedDoses = prevDoses.filter((dose) => dose.id !== id); // Remove a dose com o ID especificado
      // Reatribui os IDs para garantir que eles sejam sequenciais
      const reindexedDoses = updatedDoses.map((dose, index) => ({
        ...dose, // Mantém todas as propriedades da dose
        id: index + 1, // Reatribui o ID de forma sequencial
      }));
      return reindexedDoses; // Atualiza o estado com os IDs reindexados
    });

    setSelectedTimes((prevTimes) =>
      prevTimes.filter((_, index) => index !== id - 1)
    ); // Atualiza os horários para manter a consistência
  };

  // Lógica para captar o horário selecionado pelo usuário
  const [selectedTimes, setSelectedTimes] = useState(doses.map(() => null)); // Armazena os horários selecionados

  const handleTimeChange = (doseId, newTime) => {
    const formattedTime = newTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    setSelectedTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[doseId - 1] = formattedTime; // Atualiza o índice correto baseado no `doseId`
      return updatedTimes;
    });
  };

  // Lógica da API
  const handleSubmit = () => {
    const selectedDays = getFormattedDays();

    const validTimes = selectedTimes.filter((time) => time !== null);

    if (selectedDays.length === 0 || validTimes.length === 0) {
      Alert.alert(
        "Erro",
        "Por favor, selecione pelo menos um dia e um horário."
      );
      return;
    }

    // Converte os dados para os formatos desejados
    const formattedFrequencia = selectedDays.join(", "); // Ex.: "seg, qua, sex"
    const formattedDose = validTimes.join(", "); // Ex.: "11:00, 15:30"

    const payload = {
      days: selectedDays,
      times: validTimes, // Apenas horários válidos
    };

    console.log("Enviando payload:", payload);

    router.push({
      pathname: "./AddInsulin",
      params: {
        frequency: formattedFrequencia,
        doseString: formattedDose,
        isSwitchEnabled: true,
      },
    });
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
            {days.map((day) => (
              <View
                key={day.id} // O índice do array é usado como chave única para cada elemento renderizado.
                style={styles.dayContainer}
              >
                <Text style={styles.dayText}>{day.day}</Text>
                <Checkbox
                  value={day.selected} // Determina o estado inicial do checkbox.
                  onValueChange={() => toggleDaySelection(day.id)} // o evento onValueChange será acionado quando o valor do componente mudar, e ao ser acionado, ele chamará a função toggleDaySelection com o índice (index) como argumento.
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
