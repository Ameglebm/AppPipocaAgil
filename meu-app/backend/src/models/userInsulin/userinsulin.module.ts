import { Module } from '@nestjs/common';
import { UserinsulinService } from './service/userinsulin.service';
import { UserinsulinController } from './controller/userinsulin.controller';

/* Está faltando as injeções de dependência. Verifique outro module para pegar o modelo */
@Module({
  controllers: [UserinsulinController],
  providers: [UserinsulinService]
})
export class UserinsulinModule {}
