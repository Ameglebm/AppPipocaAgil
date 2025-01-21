import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './docs/swagger'; 

const app: Application = express();

app.use(express.json());

app.use(cors());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Iniciar o servidor
const PORT = parseInt(process.env.PORT || '3333', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
});