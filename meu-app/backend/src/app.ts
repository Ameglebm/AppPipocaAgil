import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"; 
import { AuthModule } from "./models/auth/auth.module";
import { UserModule } from "./models/users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Configuração para carregar o .env globalmente
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
