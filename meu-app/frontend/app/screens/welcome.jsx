import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter, Link } from 'expo-router';
import React, { useEffect } from 'react';

export default function welcome() {
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => { //Ao iniciar a página seta o header dela como false
      navigation.setOptions({headerShown: false});
    }, [navigation])


  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View>
                <Text>Bem vindo ao InsuCheck!</Text>
                <TouchableOpacity 
                className="flex justify-center items-center w-full min-h-[46px] px-[12px] mt-[18px] bg-[#2F39D3] shadow-3xl rounded-[8px]" 
                onPress={() => router.push('../cadastro/inputs/inputs')}>
                  <Text className="text-[#FDFDFD] text-[18px] font-bold leading-[19,80px]">Criar sua conta</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                className="flex justify-center items-center w-full min-h-[46px] px-[12px] mt-[18px] bg-[#2F39D3] shadow-3xl rounded-[8px]"
                onPress={() => router.push('./login')}>
                  <Text className="text-[#FDFDFD] text-[18px] font-bold leading-[19,80px]">Fazer Login</Text>
                </TouchableOpacity>                
            </View>
         </SafeAreaView >
    </SafeAreaProvider>
  )
}