import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text>Tela Inicial</Text>
      <Link href={"/login"}>Ir para tela de login</Link>
    </View>
  )
}