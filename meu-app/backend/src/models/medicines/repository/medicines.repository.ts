import { Injectable } from '@nestjs/common';
import { prisma } from '@/lib/prisma';
import { CreateUserMedicineDTO, UpdateUserMedicineDTO } from '../dtos/medicinesDTO';
import { IMedicinesRepository } from '../interface/medicinesRepository.interface';

@Injectable()
export class MedicinesRepository implements IMedicinesRepository {

  async createUserMedicine (data: CreateUserMedicineDTO) {
    await prisma.user_medicacao.create({
      data: {
        userId: data.userId,
        medicamento: data.nomeMedicamento,
        dosagemPorAdministracao: data.dosagemPorAdministracao,
        tipoDosagem: data.tipoDosagem,
        dosesRestantes: data.dosesRestantes,
        tipoTratamentoId: data.tipoTratamentoId,
      },
    });
  }

  async getUserMedicines(userId: number): Promise<any[] | null> {
    return await prisma.user_medicacao.findMany({
      where: {
        userId, 
      }
    })
  }

  async updateUserMedicine(data: UpdateUserMedicineDTO): Promise<void> {
    await prisma.user_medicacao.update({
      data: {
        userId: data.userId,
        medicamento: data.nomeMedicamento,
        dosagemPorAdministracao: data.dosagemPorAdministracao,
        tipoDosagem: data.tipoDosagem,
        dosesRestantes: data.dosesRestantes,
        tipoTratamentoId: data.tipoTratamentoId,
      },
      where: {
        id: data.id
      }
    })
  }
  async deleteUserMedicine(userId:number, id: number): Promise<void> {
    await prisma.user_medicacao.delete({
      where: {
        id,
        userId
      }
    })
  }

}
