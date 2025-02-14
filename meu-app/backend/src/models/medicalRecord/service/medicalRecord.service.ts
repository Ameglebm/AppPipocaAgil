import { Inject, NotFoundException } from "@nestjs/common";
import { CreateDiabetesDTO, GetDiabetesDTO, ResponseDTO } from "../dtos/medicalRecordDTO";
import { IMedicalRecordService } from "../interface/medicalRecordService.interface";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";

export class MedicalRecordService implements IMedicalRecordService {
  constructor(
    @Inject('IMedicalRecordRepository') private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async createUserDiabetes(data: CreateDiabetesDTO): Promise<void> {

    const record: ResponseDTO = await this.medicalRecordRepository.findByRecordId(data.userId);

    console.log('record:', record)
    if(!record) {
      await this.medicalRecordRepository.createRecord(data);
    } else {
      const id = record.id;
      await this.medicalRecordRepository.updateRecord(data, id);
    }
    
  }

  async getUserDiabetes(params: GetDiabetesDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10)

    const record = await this.medicalRecordRepository.findByRecordId(userId);
    
    if (!record) {
      throw new NotFoundException("Registro de diabetes não encontrado.");
    }

    return record;
  }
}