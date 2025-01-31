import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log("Hello World");
}
bootstrap();
