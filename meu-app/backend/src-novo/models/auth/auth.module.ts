import { Module } from '@nestjs/common';
import { AuthController } from './controller/authController';
import { AuthService } from './service/authService';
import { PrismaService } from '../../lib/prisma.service'
import { AuthRepository } from './repository/authRepository';

@Module({
    imports: [
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      AuthRepository,
      PrismaService
    ],
    exports: [AuthService],
})
export class AuthModule {}
