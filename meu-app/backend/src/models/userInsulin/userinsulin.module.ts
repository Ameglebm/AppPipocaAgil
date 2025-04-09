import { Module } from '@nestjs/common';
import { UserinsulinService } from './service/userinsulin.service';
import { UserinsulinController } from './controller/userinsulin.controller';
import { UserInsulinRepository } from './repository/userInsulin.repository';

/* Está faltando as injeções de dependência. Verifique outro module para pegar o modelo */
@Module({
  controllers: [UserinsulinController],
  providers: [
    {
      provide: 'IUserInsulinService',
      useClass: UserinsulinService,
    },
    {
      provide: 'IUserInsulinRepository',
      useClass: UserInsulinRepository
    },
  ],
  exports: ['IUserInsulinService', 'IUserInsulinRepository'],
})

export class UserinsulinModule {}
