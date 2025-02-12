import { Inject } from "@nestjs/common";
import { CreateDiabetesDTO, GetDiabetesDTO } from "../dtos/medicalRecordDTO";
import { IMedicalRecordService } from "../interface/medicalRecordService.interface";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";

export class MedicalRecordService implements IMedicalRecordService {
  constructor(
    @Inject('IMedicalRecordRepository') private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async createUserDiabetes(data: CreateDiabetesDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getUserDiabetes(userId: GetDiabetesDTO): Promise<any | null> {
    throw new Error("Method not implemented.");
  }
  
}