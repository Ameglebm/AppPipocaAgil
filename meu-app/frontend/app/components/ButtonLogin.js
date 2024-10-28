import React from 'react'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

const ButtonLogin = ({ labelButton, onpress }) => {

  const router = useRouter();
   
    return(
        <TouchableOpacity className="flex justify-center items-center w-[300] min-h-[42px] px-[80px] mt-4 bg-[#2F39D3] shadow-3xl rounded-[8px]" onPress={onpress}>
          <Text className="text-[#FDFDFD] text-[18px] font-bold leading-[19,80px]">{labelButton}</Text>
        </TouchableOpacity>
    )
}

export default ButtonLogin