import { KeyboardAvoidingView, Text, View, Image, TouchableOpacity } from "react-native";
import React from 'react'

export default function checkFailed() {
  return (
    <KeyboardAvoidingView className="flex flex-1 justify-center items-center">

        <View>
            <Image className="w-[168px] h-[180px]" source={require('../assets/images/failed.webp')} />
        </View>

        <View className="mt-[32px]">
            <Text className="text-[20px] text-[#373737] font-semibold not-italic leading-[22px]">Cadastro não realizado!</Text>
        </View>

        <TouchableOpacity className="mt-[32px]">
            <Text className="underline text-[14px] text-[#2F39D3] p-[2px] font-normal gap-1 leading-[19.6px]">Tentar novamente</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}