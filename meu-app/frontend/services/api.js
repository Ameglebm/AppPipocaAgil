// Importar a dependência Axios para conectar com a API
import axios from "axios";

// Criar a instância de conexão HTTP
const api = axios.create({
  baseURL: "https://apppipocaagil-production-0855.up.railway.app/", // URL do banco de dados
  timeout: 5000,
});

// Exporta a instância configurada do Axios
export default api;
