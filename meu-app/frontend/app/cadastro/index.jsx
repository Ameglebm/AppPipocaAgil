import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Urbanist_600SemiBold } from '@expo-google-fonts/urbanist'
import { Lato_400Regular } from '@expo-google-fonts/lato'
import AntDesign from '@expo/vector-icons/AntDesign';
import Dados from './inputs/inputs';


function TelaCadastro() {
    
    const [fonteLoaded] = useFonts({
        Urbanist_600SemiBold,
        Lato_400Regular
    });

    if (!fonteLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.dadosContainer}>
                <View style={styles.containerInput}>
                    <Dados></Dados>
                </View>
            </ScrollView>
        </View>
    );
}

export default TelaCadastro;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },

    btnVoltar: {
        width: 24,
        height: 24,
        marginLeft: 20,
    },
    title: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 28,
        lineHeight: 30.8,
        color: '#282828',
    },
    dadosContainer: {
        flex: 1,
        backgroundColor: '#EDF3FF',
        marginTop: 5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    containerInput: {
        alignSelf: 'center',
        paddingTop: 16,
        paddingRight: 20,
        paddingBottom: 32,
        paddingLeft: 20,
    },
    
});