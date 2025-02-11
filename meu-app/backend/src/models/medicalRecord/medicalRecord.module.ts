import { Module } from '@nestjs/common';
import { MedicalRecordController } from './controller/medicalRecord.Controller';
import { MedicalRecordService } from './service/medicalRecord.service';
import { MedicalRecordRepository } from './interface/MedicalRecordRepository.interface';

@Module({
  controllers: [MedicalRecordController],
  providers: [
    {
      provide: 'IMedicalRecordService',
      useClass: MedicalRecordService,
    },
    {
      provide: 'IMedicalRecordRepository',
      useClass: MedicalRecordRepository,
    },
  ],
  exports: ['IMedicalRecordService', 'IMedicalRecordRepository'],
})
export class MedicalRecordModule {}
