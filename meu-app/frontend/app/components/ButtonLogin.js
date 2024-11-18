import React from 'react'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const ButtonLogin = ({ labelButton, onpress }) => {

  const router = useRouter();
   
    return(
        <TouchableOpacity style={styles.container} onPress={onpress}>
          <Text style={styles.textBtn}>{labelButton}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#2F39D3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    minHeight: 42,
    paddingHorizontal: 80,
    marginTop: 16,
    borderRadius: 8
  },
  textBtn: {
    color: '#FDFDFD',
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 19.80
  }
})

export default ButtonLogin