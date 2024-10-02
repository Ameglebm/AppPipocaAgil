// Arquivo que inicializa o servidor e faz o app escutar em uma porta.
import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user";

const app: Application = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
app.use(cors());

// Configurar as rotas usando o roteador
app.use("/users", userRoutes);

// Iniciar o servidor
const PORT = parseInt(process.env.PORT || "3333", 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
