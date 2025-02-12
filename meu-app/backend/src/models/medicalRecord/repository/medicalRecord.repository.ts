import { prisma } from "@/lib/prisma";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";
import { CreateDiabetesDTO } from "../dtos/medicalRecordDTO";

export class MedicalRecordRepository implements IMedicalRecordRepository {
  findByRecordId(userId: number): Promise<any | null> {
    return prisma.user_diabetes.findFirst({ where: { userId } });
  }
  createRecord(data: CreateDiabetesDTO): Promise<void> {
    throw new Error('Not implemented');
  }
  
}