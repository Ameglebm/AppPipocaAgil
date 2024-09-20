import React from 'react'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ButtonLogin = ({ labelButton, onpress }) => {

  const router = useRouter();
   
    return(
        <TouchableOpacity className="flex justify-center items-center w-full min-h-[46px] px-[12px] mt-[18px] bg-[#2F39D3] shadow-3xl rounded-[8px]" onPress={() => router.push('../screens/checkSucess')}>
          <Text className="text-[#FDFDFD] text-[18px] font-bold leading-[19,80px]">{labelButton}</Text>
        </TouchableOpacity>
    )
}

export default ButtonLogin