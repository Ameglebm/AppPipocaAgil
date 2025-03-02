import { Module } from '@nestjs/common';
import { MedicinesService } from './service/medicines.service';
import { MedicinesController } from './controller/medicines.controller';
import { MedicinesRepository } from './repository/medicines.repository';

@Module({
  controllers: [MedicinesController],
  providers: [
    {
      provide: 'IMedicinesService',
      useClass: MedicinesService,
    },
    {
      provide: 'IMedicinesRepository',
      useClass: MedicinesRepository,
    },
  ],
  exports: ['IMedicinesService', 'IMedicinesRepository'],
})
export class MedicinesModule {}
