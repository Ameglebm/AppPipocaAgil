import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DatePicker from '@react-native-community/datetimepicker';

const modalClock = ({onTimeChange}) => {
  const [time, setTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(false);  
  const [showPicker, setShowPicker] = useState(false);
  
  const handleTimeChange = (event, selectedDate) => {
    if (event.type === "set") { // Verifica se o usuário confirmou a seleção
    const currentTime = selectedDate || time;
    setTime(currentTime); // Atualiza as horas
    setSelectedTime(true); // Marca que a hora foi selecionada
    onTimeChange(currentTime); // Chama a função de callback com a hora selecionada
    }
    setShowPicker(false); // Fecha o DatePicker em qualquer caso
  };

  function handleTimeModal() {
    setShowPicker(true); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={[
      styles.btnModal,
      selectedTime && styles.btnModalSelected, // Aplica estilo se a hora foi salva
      ]}
      onPress={handleTimeModal}
      >
        <Text
        style={[
        styles.dateTextStyle, // Estilo padrão do texto
        selectedTime && styles.dateTextStyleSelected, // Estilo quando a hora foi salva
        ]}
        >
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>     
      {showPicker && (
        <DatePicker
        mode="time"
        display="spinner"
        value={time}
        onChange={handleTimeChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    gap: 12 
  },
  btnModal: {
    width: 320,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 14,
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
    backgroundColor: "#FDFDFD", // Cor de fundo para indicar seleção
  },
  dateTextStyle: {
    color: "#373737", // Cor padrão
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },
  dateTextStyleSelected: {
    color: "#282828", // Cor do texto ao salvar
    textAlign: "center",
    fontFamily: "Lato_400Regular",
  },
});

export default modalClock