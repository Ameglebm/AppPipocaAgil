import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"; 
import { AuthModule } from "./models/auth/auth.module";
import { UserModule } from "./models/users/user.module";
import { MedicalRecordModule } from "./models/medicalRecord/medicalRecord.module";
import { MedicinesModule } from "./models/medicines/medicines.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Configuração para carregar o .env globalmente
    AuthModule,
    UserModule,
    MedicalRecordModule,
    MedicinesModule
  ],
})
export class AppModule {}
