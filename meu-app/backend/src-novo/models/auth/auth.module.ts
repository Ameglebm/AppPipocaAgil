import { Module } from '@nestjs/common';
import { AuthController } from './controller/authController-base';
import { AuthService } from './service/authService';

@Module({
    imports: [
    ],
    controllers: [AuthController],
    providers: [
      AuthService
    ],
    exports: [AuthService],
})
export class AuthModule {}
