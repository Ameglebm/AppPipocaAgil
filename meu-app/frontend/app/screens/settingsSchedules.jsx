import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import CustomHeader from "../components/CustomHeader";
import ModalClock from '../components/modalClock';
import Button from '../components/Button';
import Plus from "../components/svgComponenets/Plus";

export default function SettingsSchedules() {
  const [days, setDays] = useState([
    { day: 'D', selected: false },
    { day: 'S', selected: false },
    { day: 'T', selected: false },
    { day: 'Q', selected: false },
    { day: 'Q', selected: false },
    { day: 'S', selected: false },
    { day: 'S', selected: false },
  ]);

  const [doses, setDoses] = useState([{ id: 1, time: null }]);

  const addDose = () => {
    setDoses((prevDoses) => [
      ...prevDoses,
      { id: prevDoses.length + 1, time: null },
    ]);
  };

  const removeDose = (id) => {
    setDoses((prevDoses) => prevDoses.filter(dose => dose.id !== id));
  };

  const toggleSelectAll = () => {
    const allSelected = days.every(day => day.selected);
    setDays(days.map(day => ({ ...day, selected: !allSelected })));
  };

  const toggleDaySelection = (index) => {
    const newDays = [...days];
    newDays[index].selected = !newDays[index].selected;
    setDays(newDays);
  };

  const [selectedTimes, setSelectedTimes] = useState([]); // Armazena os horários selecionados
   const handleTimeChange = (time) => {
    setSelectedTimes(prevTimes => [...prevTimes, time]); // Adiciona horário ao array
  };

  const handleSubmit = async () => {
    const selectedDays = days.filter(day => day.selected).map(day => day.day);
    
    if (selectedDays.length === 0 || selectedTimes.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione pelo menos um dia e um horário.');
      return;
    }

    const payload = {
      days: selectedDays,
      times: selectedTimes, // Envia todos os horários selecionados
    };

    try {
    console.log('Enviando payload:', payload);
    const response = await axios.post('https://sua-api.com/endpoint', payload);
    console.log('Resposta da API:', response);

    if (response.data) {
      // Sucesso: Exibe a mensagem baseada na resposta
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } else {
      // Caso o formato da resposta não seja o esperado
      Alert.alert('Erro', 'Resposta inesperada da API.');
    }
  } catch (error) {
    console.error('Erro na API:', error);
  }};

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <CustomHeader title={"Configurar horários"} />
      <View style={styles.container}>
        <Text style={styles.title}>Selecione os dias da semana</Text>
        <TouchableOpacity onPress={toggleSelectAll} style={styles.selectAllButton}>
          <Text style={styles.selectAllButtonText}>Selecionar todos</Text>
        </TouchableOpacity>
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day.day}</Text>
              <Checkbox
                value={day.selected}
                onValueChange={() => toggleDaySelection(index)}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
      </View>
      <View>
        {doses.map((dose, index) => (
          <View key={dose.id} >
            <Text style={{paddingBottom: 8}}>{`${dose.id}ª Dose`}</Text>
            <ModalClock onTimeChange={(time) => handleTimeChange(dose.id, time)} />
              {dose.id > 1 && (
                <TouchableOpacity onPress={() => removeDose(dose.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Deletar</Text>
                </TouchableOpacity>
              )}
              {index == doses.length - 1 && (
                <TouchableOpacity style={styles.btnAdd} onPress={addDose}>
                  <Plus style={styles.imagePlus} />
                </TouchableOpacity>
              )}
            </View>
        ))}
      </View>
      <Button title={"Salvar"} onPress={handleSubmit} style={styles.buttonSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    color:"#000000",
    fontFamily:"Lato_400Regular",
    lineHeight: 21,
    marginBottom: 10,
  },
  selectAllButton: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  selectAllButtonText: {
    color:"#2F39D3",
    fontFamily:"Lato_400Regular",
    textDecorationLine: 'underline',
    fontSize: 12,
    lineHeight: 16
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: "center",
    paddingHorizontal: 10,  
  },
  dayText: {
    backgroundColor:"#EDF3FF", 
    color: "#5E5D5C",
    fontSize: 16,
    borderRadius: 10, 
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  checkbox: {
   marginTop: 10, 
  },
  btnModal: {
    width: 154,
    height: 42,
    paddingVertical: 10,
    backgroundColor: "#FDFDFD", // Adiciona cor de fundo
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#C8C8C7", // Cor da borda
    borderRadius: 8,
    elevation: 1, // Elevação de 1px (somente no Android)
    shadowColor: "#000", // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Posição da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 1, // Raio da sombra
  },
  btnModalSelected: {
    backgroundColor: "#EDF3FF", // Cor de fundo para indicar seleção
    borderColor: "#EDF3FF", // Mesma cor da borda
  },
  dateTextStyle: {
    color: "#898887", // Cor padrão
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },
  dateTextStyleSelected: {
    color: "#282828", // Cor do texto ao salvar
    textAlign: "center",
    fontFamily: "Lato_400Regular",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSave: {
    width: 320,
    alignSelf: "center",
    height: 42,
  },
  btnAdd: {
    width: 42,
    height: 42,
    marginTop: 32,
    backgroundColor: "#2F39D3",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:"center",
  },
});