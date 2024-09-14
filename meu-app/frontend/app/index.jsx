import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center space-y-6">
      <View>
        <TouchableOpacity className="justify-center items-center bg-[#2F39D3] p-4 mt-[58px] w-[320px] min-h-[42px] rounded-2xl" onPress={() => router.push('./screens/login')}>
          <Text className="text-[20px] text-[#FDFDFD]">Ir para Login</Text>
        </TouchableOpacity>
      </View>

      <Link className="text-[20px]" href={"./screens/checkFailed"}>Register failed</Link>
    </View>
  )
}