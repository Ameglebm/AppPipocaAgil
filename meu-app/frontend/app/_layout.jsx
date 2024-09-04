import { Stack } from "expo-router"

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: "Home"}} />
        <Stack.Screen name="login" options={{ title: "Login"}} />
        <Stack.Screen name="telaCadastro" options={{ title: "Cadastro"}} />
    </Stack>
  )
}