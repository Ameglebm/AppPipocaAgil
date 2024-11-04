import {Text, View, Image, TouchableOpacity} from "react-native"
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonLogin from '../components/ButtonLogin';


export default function recoverAccountEmail() {
    const navigation = useNavigation();
    return (
        <View style={{ paddingTop: 20, paddingHorizontal: 16 }}>  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("../assets/images/backIcon.png")}
                    />
                </TouchableOpacity>
            </View>
    
            <View>
                <Image
                    className="w-[168] h-[150.809]"
                    source={require("../assets/images/undraw_confirmed_re_sef71.png")}
                />
            </View>

            <View className="mt-[32px]">
                <Text className="text-[20px] text-[#282828] font-semibold not-italic leading-[27px]">
                    Verifique seu e-mail e abra o link que enviamos para continuar!
                </Text>
            </View>

            <ButtonLogin
                labelButton="OK"
                onpress={() => {navigation.navigate("./Auth/telaCadastro")
                }}
            />
        </View>

        
    );
    
}