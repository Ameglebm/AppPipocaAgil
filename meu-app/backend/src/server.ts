import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./docs/swagger"; 

// Inicializa o aplicativo Express
const app: Application = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
app.use(cors());

// Rota da documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurar as rotas usando o roteador
app.use("/users", userRoutes);

// Iniciar o servidor
const PORT = parseInt(process.env.PORT || "3333", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
});
