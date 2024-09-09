import { React, useState, useEffect} from "react";
import { KeyboardAvoidingView, TextInput, Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from 'expo-router'
import ShowHide from "../components/showHide";
import ButtonLogin from "../components/ButtonLogin";
// import ToggleButton from "../components/toggleButton";   [MVP]

export default function Login() {
  
  const [email, setEmail]= useState(null);
  const [password, setPassword]= useState(null);
  const [errorEmail, setErrorEmail]= useState(null);
  const [errorPassword, setErrorPassword]= useState(null);

  //Enviar dados do formulário para o Backend
 

 /* const validar = () => {
    setErrorEmail("Prencha corretamente")
    return false
  }*/

  const signIn = () => {
    console.log('click');
  }

  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center mx-2">
      <View className="pb-[32px]">
        <Image className="w-[76px] h-[66px] shrink-0"
        source={require('../assets/images/user.webp')}/>
      </View>

      <View className="flex-shrink-0 w-[350px] h-[385px] bg-[#EDF3FF] rounded-[16px] p-5">

        {/* <View>              //Botão ocultado [MVP]
          <ToggleButton />
        </View> 
        */}

        <View>
          <View className="space-y-1">
            <Text className="text-[14px] pb-3 text-[#282828]">E-mail</Text>
            <TextInput 
            className="text-[16px] p-2 border-[1px] border-[#b7b7b8] rounded-md" placeholder="Email@correto.com" 
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            errorMessage={errorEmail}
            />
          </View>

          <View className="space-y-1 pt-4">
            <Text className="text-[14px] pb-3 text-[#282828]">Senha</Text>
            <ShowHide placeholder="Digite sua senha" onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
          </View>          
        </View>

        <View className="pt-[10px] pb-[8px] px-3 flex-col inline-flex justify-center items-center gap-4">
          <TouchableOpacity>
            <Text className="text-[#2933AA] text-[14px] font-bold not-italic leading-[19.6px] absolute mt-[16px] right-[-165px]">Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View>
          <ButtonLogin labelButton="Entrar" onpress={signIn}></ButtonLogin>
        </View>

      </View>

      <View className="flex gap-[16px] justify-center items-center m-[8px]">
        <View className="flex flex-row text-[14px]">
          <Text className="pt-[10px] text-[#464646]">Não possui uma conta? </Text>
          <Link href={"/cadastro"} className="pt-[10px] text-[#2933AA] text-[14px] font-bold not-italic leading-[19.6px]"> Cadastre-se!</Link>
        </View>
        
      </View>

    </KeyboardAvoidingView>
  );
}