import { prisma } from "@/lib/prisma";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";
import { CreateDiabetesDTO,  PostLeituraGlicemiaDTO, GetDiabetesDTO, ResponseDTO } from "../dtos/medicalRecordDTO";


export class MedicalRecordRepository implements IMedicalRecordRepository {
  async findByRecordId(id: number): Promise<any | null> {
    const userId = id;
  
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

  async updateRecord(data: CreateDiabetesDTO, id: number): Promise<void> {
    
    await prisma.user_diabetes.update({
      data: {
        diabetesId: data.diabetesId
      },
      where: {
        id
      }
    })
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
