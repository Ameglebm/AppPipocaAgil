import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { postFunction } from '../src/APIService'

const ButtonLogin = ({ labelButton, onpress }) => {
  function btnSigInClick (){
    postFunction()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  
    return(
        <TouchableOpacity className="flex bg-[#2F39D3] p-4 mt-[58px] w-[320px] min-h-[42px] justify-center items-center rounded-2xl">
          <Text className="text-[#FDFDFD] text-[22px]" onPress={onpress}>{labelButton}</Text>
        </TouchableOpacity>
    )
}

export default ButtonLogin