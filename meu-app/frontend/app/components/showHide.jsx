import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Biblioteca de ícones do Expo

const PasswordInput = ({onChangeText, value, placeholder}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <View className="flex-row justify-between p-2 border-[1px] border-[#b7b7b8] bg-[#FDFDFD] rounded-md">
        <TextInput className="text-[16px] flex-1"
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible} // Controla a visibilidade da senha
          onChangeText={onChangeText}
          value={value}
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
