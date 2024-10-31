import React, {useEffect, useState} from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useFonts, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import { Lato_400Regular} from "@expo-google-fonts/lato";

export default function defineNewPassword() {
    const navigation = useNavigation();
    
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [secureText2, setSecureText2] = useState(true);
    
    const [errors, setErrors] = useState({});

    useEffect(() => { //Ao iniciar a página seta o header dela como false
        navigation.setOptions({headerShown: false});
      }, [navigation])

      const [fonteLoaded] = useFonts({
        Urbanist_700Bold,
        Lato_400Regular,
      });

      const handlePress = () => {
        setIsChecked((prevState) => {
          const newState = !prevState;
          setButtonColor(newState ? "#2F39D3" : "#7A98FF");
          setIsDisabled(!newState);
          return newState;
        });
      };

  return (
    <SafeAreaProvider styles={{flex: 1}}>
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Defina sua nova senha</Text>
            </View>

            <View>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.subTitle}>Senha*</Text>
                        <TextInput 
                        style={styles.inputs} 
                        placeholder='Digite sua senha'
                        secureTextEntry={secureText}
                        value={senha}
                        onChangeText={setSenha}
                        placeholderTextColor="#B1B0AF"
                        />
                        <Pressable
                        style={styles.iconBtn}
                        onPress={() => setSecureText((prevState) => !prevState)}
                        >
                            <Feather
                              name={secureText ? "eye-off" : "eye"}
                              size={17}
                              color="#B1B0AF"
                              style={styles.eyeIcon}
                            />
                        </Pressable>
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Confirmar senha*</Text>
                        <TextInput 
                        style={styles.inputs} 
                        placeholder='Confirme sua senha'
                        secureTextEntry={secureText}
                        value={senha}
                        onChangeText={setSenha}
                        placeholderTextColor="#B1B0AF"
                        />
                        <Pressable
                        style={styles.iconBtn}
                        onPress={() => setSecureText((prevState) => !prevState)}
                        >
                            <Feather
                              name={secureText ? "eye-off" : "eye"}
                              size={17}
                              color="#B1B0AF"
                              style={styles.eyeIcon}
                            />
                        </Pressable>
                    </View>
                </View>

                <Pressable style={styles.btn}>
                    <Text style={styles.textBtn}>Confirmar</Text>

                    {/*
                    <View style={styles.shadowLayer1}/>
                    <View style={styles.shadowLayer2}/>
                    */}

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
    mainContainer: {
        flex: 1,
        backgroundColor: "#FDFDFD",
    },
    subTitle: {
        fontFamily: "Lato_400Regular",
        fontSize: 14,
        fontStyle: "normal",
        lineHeight: 21,
        marginBottom: 8,
    },
    inputs: {
        backgroundColor: "#FDFDFD",
        fontFamily: "Lato_400Regular",
        fontSize: 16,
        fontStyle: "normal",
        lineHeight: 22,
        width: 320,
        height: 44,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 8,
        borderStyle: "solid",
        borderColor: "#B1B0AF",
        borderWidth: 0.8,
        elevation: 5,
    },
    textBtn: {
        color: "#FDFDFD",
        fontFamily: "Urbanist_700Bold",
        fontSize: 18,
        fontStyle: "normal",
        lineHeight: 19.8,
    },
    btn: {
        backgroundColor: "#2F39D3",
        width: 320,
        height: 42,
        paddingVertical: 8,
        paddingHorizontal: 80,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 8,
        elevation: 10,
    },
    iconBtn: {
        position: "absolute",
        top: 41,
        right: 15,
        zIndex: 1,
      },
      eyeIcon: {
        width: 24,
        height: 24,
      },
    
      /*
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
    */
})