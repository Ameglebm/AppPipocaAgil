import { Module } from '@nestjs/common';
import { UserinsulinController } from './controller/userinsulin.controller';
import { UserinsulinService } from './service/userinsulin.service';

@Module({
  controllers: [UserinsulinController],
  providers: [UserinsulinService]
})
export class UserinsulinModule {}
