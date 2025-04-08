import AsyncStorage from "@react-native-async-storage/async-storage";
// Utilitário para gerenciar o token
export const saveToken = async (token) => {
  // Armazena o token no AsyncStorage (ou localStorage no React Native Web)
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Erro ao obter o token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Erro ao remover o token:", error);
  }
};
