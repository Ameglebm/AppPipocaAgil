import { Stack } from "expo-router"
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Layout() {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="cadastro/index" options={{
        title: "Crie a sua conta",
        headerTitleStyle: {
          fontFamily: 'Urbanist_600SemiBold',
          fontSize: 28,
          fontWeight:'700',
          lineHeight: 30.8,
          color: '#282828',
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 5,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={24}
                color="black"
              />
          </TouchableOpacity>
        ),
      }} />
    </Stack>
  )
}

