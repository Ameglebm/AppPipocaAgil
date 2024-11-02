// Importar a dependência Axios para conectar com a API
import axios from "axios";

// Criar a instância de conexão HTTP
const api = axios.create({
  baseURL: "http://localhost:3333", // URL do banco de dados
  timeout: 5000,
});

// Exporta a instância configurada do Axios
export default api;
