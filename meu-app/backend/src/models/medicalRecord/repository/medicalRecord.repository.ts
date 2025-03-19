import { prisma } from "@/lib/prisma";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";
import { CreateDiabetesDTO,  InsulinAdministrationDTO,  MetaGlicemicaDTO, UserGlicemiaDTO } from "../dtos/medicalRecordDTO";


export class MedicalRecordRepository implements IMedicalRecordRepository {

  async getUserDiabetesByUserId(id: number): Promise<any | null> {
    const userId = id;
  
    return await prisma.user_diabetes.findFirst({ where: { userId } });
  }

  async createUserDiabetesRecord(data: CreateDiabetesDTO): Promise<void> {

    await prisma.user_diabetes.create({
      data: {
        userId: data.userId,
        diabetesId: data.diabetesId,
      },
    });
  }

  async updateUserDiabetesRecord(data: CreateDiabetesDTO, id: number): Promise<void> {
    
    await prisma.user_diabetes.update({
      data: {
        diabetesId: data.diabetesId
      },
      where: {
        id
      }
    })
  }
  async registerGlucoseTarget(leitura: MetaGlicemicaDTO): Promise<void> {
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

  async createInsulinAdministrationRecord(data: InsulinAdministrationDTO): Promise<void> {
    await prisma.user_administracao_insulina.create({
      data: {
        userId: data.userId,
        adminInsulinaId: data.adminInsulinaId,
      },
    });
  }
  
  async getInsulinAdministrationByUserId(userId: number): Promise<any | null> {
    return await prisma.user_administracao_insulina.findFirst({ where: { userId } });
  }
  
  async updateInsulinAdministrationRecord(data: InsulinAdministrationDTO, id: number): Promise<void> {
    // UPDATE user_administracao_insulina SET adminInsulinaId = 2 WHERE id = 1
    await prisma.user_administracao_insulina.update({
      data: {
        adminInsulinaId: data.adminInsulinaId
      },
      where: {
        id
      }
    })
  }

  async getTiposGlicemia(): Promise<any | null> {
    return await prisma.tipo_Glicemia.findMany();
  }

  async createUserGlicemia(data: UserGlicemiaDTO): Promise<void> {
    await prisma.user_Glicemia.create({
      data: {
        userId: data.userId,
        glicemiaId: data.glicemiaId,
        value: data.value
      },
    });
  }

  async getUserGlicemia(userId: number): Promise<any | null> {
    // SELECT * FROM user_Glicemia WHERE userId = 1
    return await prisma.user_Glicemia.findMany({where: { userId } , orderBy: { createdAt:"desc" }});
  }
}