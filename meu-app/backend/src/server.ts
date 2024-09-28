// Arquivo que inicializa o servidor e faz o app escutar em uma porta.
import Fastify from "fastify";
import cors from '@fastify/cors'
import { userRoutes } from "./routes/user";

const app = Fastify()

app.register(cors)
app.register(userRoutes)

app.listen({
  port: 3333,
  host: '0.0.0.0' 
})