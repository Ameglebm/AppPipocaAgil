import { Module } from '@nestjs/common';
import { UserinsulinService } from './service/userinsulin.service';
import { UserinsulinController } from './controller/userinsulin.controller';

@Module({
  controllers: [UserinsulinController],
  providers: [UserinsulinService]
})
export class UserinsulinModule {}
