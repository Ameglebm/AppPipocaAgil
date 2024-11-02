import {Text, View, Image, TouchableOpacity} from "react-native"
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonLogin from './ButtonLogin';

export default function recoverSucessfull() {
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
                    className="w-[168] h-[198.4]"
                    source={require("../assets/images/undraw_mail_sent_re_0ofv 1.png")}
                />
            </View>

            <View className="mt-[32px]">
                <Text className="text-[20px] text-[#373737] font-semibold not-italic leading-[22px]">
                    Senha recuperada com sucesso!
                </Text>
            </View>

            <ButtonLogin
                labelButton="Login"
                onpress={() => {navigation.navigate("./screens/login.jsx")
                }}
            />
        </View>

        );
    
}