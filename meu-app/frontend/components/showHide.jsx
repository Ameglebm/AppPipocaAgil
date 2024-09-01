import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Biblioteca de ícones do Expo

const PasswordInput = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <View className="flex-row justify-between p-2 border-[1px] border-[#b7b7b8] rounded-md">
        <TextInput className="text-[16px] flex-1"
          placeholder="Digite sua senha"
          secureTextEntry={!isPasswordVisible} // Controla a visibilidade da senha
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;
