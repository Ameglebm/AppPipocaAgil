import { Inject, NotFoundException } from "@nestjs/common";
import { CreateDiabetesDTO, GetDiabetesDTO } from "../dtos/medicalRecordDTO";
import { IMedicalRecordService } from "../interface/medicalRecordService.interface";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";

export class MedicalRecordService implements IMedicalRecordService {
  constructor(
    @Inject('IMedicalRecordRepository') private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async createUserDiabetes(data: CreateDiabetesDTO): Promise<void> {
    await this.medicalRecordRepository.createRecord(data);
  }

  async getUserDiabetes(userIdDto: GetDiabetesDTO): Promise<any | null> {
    const record = await this.medicalRecordRepository.findByRecordId(userIdDto.userId);
    if (!record) {
      throw new NotFoundException("Registro de diabetes não encontrado.");
    }
    return record;
  }
}