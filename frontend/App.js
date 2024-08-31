import React from "react";
import { KeyboardAvoidingView, TextInput, Text, View, Image, TouchableOpacity } from "react-native";

export default function App() {

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center mx-2">
      <View className="flex w-full h-[300px] bg-[#EFEFF0] rounded-xl p-5">

        <View>
          <Text>Usuário ou senha inválidos</Text>
        </View>

        <View>
          <View className="space-y-1">
            <Text className="text-[16px]">E-mail</Text>
            <TextInput className="text-[16px] p-2 border-[1px] border-[#b7b7b8] rounded-md" placeholder="Email@correto.com" />
          </View>

          <View className="space-y-1 pt-4">
            <Text className="text-[16px]">Senha</Text>
            <TextInput className="text-[16px] p-2 border-[1px] border-[#b7b7b8] rounded-md" placeholder="Digite sua senha" secureTextEntry={true} />
          </View>          
        </View>

      </View>

      <View>
        <TouchableOpacity className="pl-[250px] pt-[18px]">
          <Text className="text-[#3A00EA] font-medium">Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <View className="flex bg-[#969696] p-4 mt-[45px] w-full items-center rounded-full">
        <TouchableOpacity>
          <Text className="text-white text-[22px]">Entrar</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}