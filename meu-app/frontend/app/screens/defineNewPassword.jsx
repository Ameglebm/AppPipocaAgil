import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import { Lato_400Regular} from "@expo-google-fonts/lato";

export default function defineNewPassword() {
    const navigation = useNavigation();

    useEffect(() => { //Ao iniciar a página seta o header dela como false
        navigation.setOptions({headerShown: false});
      }, [navigation])

      const [fonteLoaded] = useFonts({
        Urbanist_700Bold,
        Lato_400Regular,
      });

  return (
    <SafeAreaProvider styles={{flex: 1}}>
        <SafeAreaView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Defina sua nova senha</Text>
            </View>

            <View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.subTitle}>Senha*</Text>
                        <TextInput style={styles.inputs} placeholder='Digite sua senha'></TextInput>
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Confirmar senha*</Text>
                        <TextInput style={styles.inputs} placeholder='Confirme sua senha'></TextInput>
                    </View>
                </View>

                <Pressable style={styles.btn}>
                <View style={styles.shadowLayer1}/>
                <View style={styles.shadowLayer2}/>
                    <Text style={styles.textBtn}>Confirmar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        
        marginBottom: 64,
    },
    title:{
        marginTop: 20,
        color: "#282828",
        fontFamily: "Urbanist_700Bold",
        fontStyle: "normal",
        fontSize: 28,
        lineHeight: 30.8,
    },
    container: {
        width: 320,
        height: 162,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
    },
    subTitle: {
        fontFamily: "Lato_400Regular",
        fontSize: 14,
        fontStyle: "normal",
        lineHeight: 21,
        marginBottom: 8,
    },
    inputs: {
        fontFamily: "Lato_400Regular",
        fontSize: 16,
        fontStyle: "normal",
        lineHeight: 22,
        marginBottom: 8,
        width: 320,
        height: 44,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FDFDFD",
        zIndex: 1, // Certifique-se de que a caixa esteja acima das sombras
    },
    textBtn: {
        color: "#FDFDFD",
        fontFamily: "Urbanist_700Bold",
        fontSize: 18,
        fontStyle: "normal",
        lineHeight: 19.8,
    },
    btn: {
        width: 320,
        height: 42,
        paddingVertical: 8,
        paddingHorizontal: 80,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2F39D3",
        borderRadius: 8,
        zIndex: 1, // Certifique-se de que a caixa esteja acima das sombras
    },
    shadowLayer1: {
        position: 'absolute',
        left: 0,
        top: 2,
        width: 320,
        height: 41,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.15)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 8,
    },
    shadowLayer2: {
        position: 'absolute',
        left: 0,
        top: 1,
        width: 320,
        height: 41,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.30)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
    },
    shadowLayer3: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 320,
        height: 65,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.15)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 8,
    },
    shadowLayer4: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 320,
        height: 65,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(12, 12, 13, 0.30)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
    },
})