// Arquivo que inicializa o servidor e faz o app escutar em uma porta.
import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Inicializa o aplicativo Express
const app: Application = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
app.use(cors());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "Documentação automática da API",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Caminho para os arquivos de rotas
};

// Gerar documentação do Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Rota da documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurar as rotas usando o roteador
app.use("/users", userRoutes);

// Iniciar o servidor
const PORT = parseInt(process.env.PORT || "3333", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
});
