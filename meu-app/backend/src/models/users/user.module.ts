import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
    imports: [
    ],
    controllers: [UserController],
    providers: [
      {
        provide: 'IUserService',
        useClass: UserService, 
      },
      {
        provide: 'IUserRepository',
        useClass: UserRepository,
      },
    ],
    exports: ['IUserService'],
})
export class UserModule {}
