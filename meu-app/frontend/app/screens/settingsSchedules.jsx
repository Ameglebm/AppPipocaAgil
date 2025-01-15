import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView  } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
// Components
import CustomHeader from "../components/CustomHeader";
import ModalClock from '../components/modalClock';
import Button from '../components/Button';
import Plus from "../components/svgComponenets/Plus";
import Trash from "../components/svgComponenets/TrashSvg";

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
  const [selectedTimes, setSelectedTimes] = useState([]); // Armazena os horários selecionados

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
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{marginTop: 50, paddingBottom: 16}}>
        <CustomHeader title={"Configurar horários"}/>
      </View>
      
      <View style={{alignItems: "center"}}>
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
              <ModalClock onTimeChange={(time) => handleTimeChange(dose.id, time)} />
                {dose.id > 1 && (
                  <TouchableOpacity onPress={() => removeDose(dose.id)} style={styles.deleteButton}>
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
        style={[styles.buttonSave, 
        doses.length == 1 && { position: 'relative', marginTop: 105 },
        doses.length == 2 && { position: 'relative', marginTop: 20 },
        doses.length >= 3 && { position: 'relative', marginBottom: 16
        }]}/>
      </View>
      </View>
    </ScrollView>
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
   marginTop: 16,
   borderColor: "#49454F"
  
  },
  textDose: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#282828",
    paddingBottom: 5,
    lineHeight: 21
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
  deleteButton: {
    position: "absolute",
    top: 37,
    left: 284
  },
});