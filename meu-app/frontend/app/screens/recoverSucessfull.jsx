import React, { useEffect } from "react";
import {Text, View, Image, TouchableOpacity, Button, StyleSheet} from "react-native"
import { useNavigation, useRouter } from "expo-router";
import { useFonts, Lato_400Regular  } from "@expo-google-fonts/lato";
import { Urbanist_700Bold } from "@expo-google-fonts/urbanist";

export default function recoverAccountEmail() {
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        //Ao iniciar a página seta o header dela como false
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [fonteLoaded] = useFonts({
        Lato_400Regular,
        Urbanist_700Bold,
    });

    return (
        <View style={{flex: 1}}>  
            <View style={{marginTop: 46, paddingHorizontal: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 24, height: 24 }} source={require("../assets/images/backIcon.png")} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={require("../assets/images/undraw_confirmed_re_sef71.png")} />
                </View>

                <View>
                    <Text style={styles.text}>
                        Senha recuperada com sucesso!
                    </Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={router.push("./login")}>
                    <Text style={styles.textBtn}>Login</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}
    const styles = StyleSheet.create ({
        container: {
            flex: 0.9,
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
        },

        text: {
            fontFamily: "Urbanist_700Bold",
            fontSize: 20,
            fontStyle: "normal",
            lineHeight: 22,
            textAlign: "center",
            color: "#373737",
        },
        btn: {
            backgroundColor: "#2F39D3",
            paddingHorizontal: 42,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#2F39D3', // Persian Blue
        },
        textBtn: {
            fontFamily: "Urbanist_700Bold",
            fontSize: 18,
            fontStyle: "normal",
            lineHeight: 19.8,
            color: "#FDFDFD",
        }
    })