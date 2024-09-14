import { Stack, useRouter } from "expo-router"
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Layout() {

  const router = useRouter();
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ 
        title: "Home",
        headerTitleStyle: {
          fontFamily: 'Urbanist_600SemiBold',
          fontSize: 28,
          fontWeight:'700',
          lineHeight: 30.8,
          color: '#282828',
        },}}/>
      
      <Stack.Screen name="screens/login" options={{ 
        title: "Login",
        headerTitleStyle: {
          fontFamily: 'Urbanist_600SemiBold',
          fontSize: 28,
          fontWeight:'700',
          lineHeight: 30.8,
          color: '#282828',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
              <AntDesign
                name="left"
                size={24}
                color="black"
              />
          </TouchableOpacity>
        ),
        }} />

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
          <TouchableOpacity onPress={() => router.back()}>
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