import { prisma } from "@/lib/prisma";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";
import { CreateDiabetesDTO } from "../dtos/medicalRecordDTO";

export class MedicalRecordRepository implements IMedicalRecordRepository {
  async findByRecordId(userId: number): Promise<any | null> {
    return await prisma.user_diabetes.findFirst({ where: { userId } });
  }

  async createRecord(data: CreateDiabetesDTO): Promise<void> {
    await prisma.user_diabetes.create({
      data: {
        userId: data.userId,
        diabetesId: data.diabetesId,
      },
    });
  }
}
