import React from 'react'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ButtonLogin = ({ labelButton, onpress }) => {

  const router = useRouter();
   
    return(
        <TouchableOpacity className="flex bg-[#2F39D3] shadow-3xl px-[80px] py-2 mt-[58px] w-[320px] min-h-[42px] justify-center items-center rounded-[8px]" onPress={() => router.push('../screens/checkSucess')}>
          <Text className="text-[#FDFDFD] text-[18px] font-bold leading-[19,80px]">{labelButton}</Text>
        </TouchableOpacity>
    )
}

export default ButtonLogin