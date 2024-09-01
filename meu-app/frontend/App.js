import { React, useState, useEffect} from "react";
import { KeyboardAvoidingView, TextInput, Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import ShowHide from "./components/showHide";
import ToggleButton from "./components/toggleButton";
import { FaLinesLeaning } from "react-icons/fa6";

export default function Login() {
  
  const [email, setEmail]= useState(null);
  const [password, setPassword]= useState(null);
  const [errorEmail, setErrorEmail]= useState(null);
  const [errorPassword, setErrorPassword]= useState(null);

  const validar = () => {
    setErrorEmail("Prencha")
    return false
  }

  

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center mx-2">
      <View className="pb-[32px]">
        <Image className="w-[76px] h-[66px] shrink-0"
        source={require('./assets/images/image.webp')}/>
      </View>

      <View className="flex-shrink-0 w-[350px] h-[300px] bg-[#EFEFF0] rounded-[20px] p-5">

        <View>
          <ToggleButton />
        </View>

        <View>
          <View className="space-y-1">
            <Text className="text-[14px] pb-3 text-[#AFB1B6]">E-mail</Text>
            <TextInput 
            className="text-[16px] p-2 border-[1px] border-[#b7b7b8] rounded-md" placeholder="Email@correto.com" 
            onChangeText={value =>setEmail(value)}
            keyboardType="email-address"
            errorMessage={errorEmail}
            />
          </View>

          <View className="space-y-1 pt-4">
            <Text className="text-[14px] pb-3 text-[#AFB1B6]">Senha</Text>
            <ShowHide placeholder="Digite sua senha" onChangeText={text=>setPassword(text)} secureTextEntry={true} />
          </View>          
        </View>

      </View>

      <View className="pt-[10px] pb-[8px] px-3 flex-col inline-flex justify-center items-center gap-4">
        <TouchableOpacity>
          <Text className="text-[#3A00E5] text-[12px] font-medium not-italic leading-4 tracking-[0.6px] absolute top-[10px] right-[-165px]">Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-col bg-[#969696] p-4 mt-[45px] w-[305px] min-w-[305px] items-center rounded-full">
        <TouchableOpacity>
          <Text className="text-white text-[22px]">Entrar</Text>
        </TouchableOpacity>
      </View>

      <View className="flex gap-[16px] justify-center items-center m-[8px]">
        <View className="flex flex-row">
          <Text className="pt-[10px] text-[#969696]">Não possui uma conta? </Text>
          <TouchableOpacity>
            <Text className="pt-[10px] text-[#3A00E5]">Cadastre-se!</Text>
          </TouchableOpacity>
        </View>
        

        <View className="flex flex-row">
          <Text className="pt-[10px] text-[#969696]">Dúvidas? </Text>
          <TouchableOpacity>
            <Text className="pt-[10px] text-[#3A00E5]">Fale com a gente</Text>
          </TouchableOpacity>
        </View>
        
      </View>

    </KeyboardAvoidingView>
  );
}