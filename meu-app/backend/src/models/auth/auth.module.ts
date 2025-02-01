import { Module } from '@nestjs/common';
import { AuthController } from './controller/authController';
import { AuthService } from './service/authService';
import { AuthRepository } from './repository/authRepository';
import { UserRepository } from '../users/repository/user.repository';

@Module({
    imports: [
    ],
    controllers: [AuthController],
    providers: [
      {
        provide: 'IAuthService',
        useClass: AuthService, // Aqui fazemos a inversão de dependência
      },
      {
        provide: 'IAuthRepository',
        useClass: AuthRepository,
      },
      {
        provide: 'IUserRepository',
        useClass: UserRepository,
      },
    ],
    exports: ['IAuthService'],
})
export class AuthModule {}
