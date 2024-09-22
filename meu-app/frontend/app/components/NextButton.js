import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useFonts, Urbanist_700Bold } from '@expo-google-fonts/urbanist'
import React from 'react'
import slides from './slides';

export default function NextButton({scrollTo}) {
    
    const [fonteLoaded] = useFonts({
        Urbanist_700Bold,
    });

  return (
    
    <TouchableOpacity onPress={scrollTo} style={styles.container}>
        <Text style={styles.text}>Próximo</Text>
    </TouchableOpacity>
  
  )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F39D3',
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginRight: 48,
        bottom: 24,
    },

    text: {
        fontSize: 18,
        fontFamily: 'Urbanist_700Bold',
        color: '#FDFDFD',
        lineHeight: 19.8,
    }
})