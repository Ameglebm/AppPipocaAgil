import { React, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import ShowHide from "../components/showHide";
import ButtonLogin from "../components/ButtonLogin";
// arquivo config da API
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const router = useRouter();

  // Enviar form para backend
  const sendForm = async () => {
    setErrorEmail(null);
    setErrorPassword(null);

    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail("Por favor, insira um e-mail válido.");
      valid = false;
    }

    if (!password || password.length < 8) {
      setErrorPassword("A senha deve ter pelo menos 8 caracteres.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await api.post("/users/login", {
        email: email,
        senha: password,
      });

      console.log(response);
      sessionStorage.setItem("token", response.data.token);
      router.replace("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView className="bg-[#FDFDFD] flex items-center pt-[100px] w-full h-full">
      <View>
        <Image
          className="w-[66px] h-[66px]"
          source={require("../assets/images/user.webp")}
        />
      </View>

      <View className="w-[392px] h-[300px] top-[120px] bg-[#EDF3FF] rounded-2xl">
        <View className="px-[12px] pt-[22px]">
          <View className="">
            <Text className="text-[14px] pb-3 text-[#282828]">E-mail*</Text>
            <TextInput
              className="text-[16px] p-2 border-[1px] border-[#b7b7b8] bg-[#FDFDFD] shadow-3xl rounded-md"
              placeholder="email@correto.com"
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              value={email}
            />
            {errorEmail && (
              <Text className="text-[#FF0000] text-[12px]">{errorEmail}</Text>
            )}
          </View>

          <View className="space-y-1 pt-4">
            <Text className="text-[14px] pb-3 text-[#282828]">Senha</Text>
            <ShowHide
              placeholder="Digite sua senha"
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
            />
            {errorPassword && (
              <Text className="text-[#FF0000] text-[12px]">
                {errorPassword}
              </Text>
            )}
          </View>
        </View>

        {/* Navegação para a tela de recuperação de senha */}
        <View className="pt-[16px] pr-3 items-end">
          <TouchableOpacity onPress={() => router.push("../recuperacaoSenha")}>
            <Text className="text-[#2933AA] text-[14px] font-bold not-italic leading-[19.6px]">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-center items-center px-[12px] shadow-3xl">
          <ButtonLogin labelButton="Entrar" onpress={sendForm}></ButtonLogin>
        </View>
      </View>

      <View className="flex-1 flex-row text-[14px] justify-end items-center pt-[100px]">
        <Text className="text-[#464646]">Não possui uma conta? </Text>
        <Link
          href={"/cadastro"}
          className="text-[#2933AA] text-[14px] font-bold not-italic leading-[19.6px]"
        >
          {" "}
          Cadastre-se!
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
