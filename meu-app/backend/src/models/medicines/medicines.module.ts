import { Module } from '@nestjs/common';
import { MedicinesService } from './service/medicines.service';
import { MedicinesController } from './controller/medicines.controller';

@Module({
  providers: [MedicinesService],
  controllers: [MedicinesController]
})
export class MedicinesModule {}
