import { prisma } from "@/lib/prisma";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";
import { CreateDiabetesDTO, PostLeituraGlicemiaDTO } from "../dtos/medicalRecordDTO";

export class MedicalRecordRepository implements IMedicalRecordRepository {
  findByRecordId(userId: number): Promise<any | null> {
    return prisma.user_diabetes.findFirst({ where: { userId } });
  }
  createRecord(data: CreateDiabetesDTO): Promise<void> {
    throw new Error('Not implemented');
  }
  
  async registerLeituraGlicemia(leitura: PostLeituraGlicemiaDTO): Promise<void> {
    await prisma.meta_Glicemia.create({
      data: {
        userId: leitura.userId,
        periodoId: leitura.periodoId,
        metaMin: leitura.metaMin,
        metaIdeal: leitura.metaIdeal,
        metaMax: leitura.metaMax,
        isAtual: true
      }
    })
  }
}