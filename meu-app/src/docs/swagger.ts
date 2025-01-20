import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Pipoca Ágil (Insucheck)",
      version: "1.0.0",
      description: "Documentação das rotas da API",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {          // Nome do esquema de segurança
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // security: [
    //   {
    //     bearerAuth: [],         // Aplica globalmente (opcional)
    //   },
    // ],
  },
  apis: [path.join(__dirname, "../routes/*.ts")], // Caminho para os arquivos de rotas
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
