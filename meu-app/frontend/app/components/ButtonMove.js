import { View, Text, StyleSheet, Pressable } from "react-native";
import { useFonts, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import React from "react";

export default function ButtonMove({
    scrollTo,
}) {
    const [fonteLoaded] = useFonts({
        Urbanist_700Bold,
    });

  return (
    <View style={styles.container}>
      <Pressable onPress={scrollTo} style={styles.moveButtton}>
        <Text style={styles.textButton}>Salvar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 20
    },
    moveButtton: {
        width: "100%",
        height: 36,
        borderRadius: 8,
        backgroundColor: '#2F39D3',
        justifyContent: 'center',
        alignItems: 'center',
        // Configuração de sombra para iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        // Configuração de sombra para Android
        elevation: 3, // Use valores baixos para uma sombra mais sutil
    },
    textButton: {
        fontFamily: 'Urbanist_700Bold',
        color: '#FDFDFD',
        fontSize: 18,
        lineHeight: 19.8
    }
})