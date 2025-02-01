import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita a validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não declarados nos DTOs
      forbidNonWhitelisted: true, // Retorna erro se receber campos não permitidos
      transform: true, // Converte os valores para os tipos definidos no DTO
    })
  );

  // ✅ Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle("API de Autenticação")
    .setDescription("Documentação da API de autenticação e gerenciamento de usuários")
    .setVersion("1.0")
    .addBearerAuth() // Adiciona suporte para autenticação via token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  // ✅ Carrega a porta do .env
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3333;

  await app.listen(port);
  console.log(`🚀 Projeto sendo executado na porta ${port}`);
  console.log(`📄 Swagger disponível em: http://localhost:${port}/api/docs`);
}
bootstrap();
