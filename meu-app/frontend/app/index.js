import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text>Tela Inicial</Text>
      <Link href={"/login"}>Ir para tela de login</Link>
      <Link href={"/checkFailed"}>Ir para tela de Cadastro não realizado</Link>
      <Link href={"/checkSucess"}>Ir para tela de Caastro realizado com sucesso!</Link>
    </View>
  )
}