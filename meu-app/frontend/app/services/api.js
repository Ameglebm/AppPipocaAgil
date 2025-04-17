// Importar a dependência Axios para conectar com a API
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Criar a instância de conexão HTTP
const api = axios.create({
  baseURL: "https://apppipocaagil-production-5100.up.railway.app/", // URL do banco de dados
  timeout: 5000,
});

// Interceptador para adicionar o token no cabeçalho das requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exporta a instância configurada do Axios
export default api;
