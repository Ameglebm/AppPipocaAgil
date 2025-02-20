import { Injectable } from '@nestjs/common';
import { CreateMedicineDTO } from '../dtos/medicinesDTO';

@Injectable()
export class MedicinesService {
  constructor(private readonly prisma: { medicine: { create: (arg0: { data: { name: string; dosage: string; form: string; quantity: number; }; }) => any; }; }) {}

  async addMedicine(createMedicineDto: CreateMedicineDTO) {
    return await this.prisma.medicine.create({
      data: {
        name: createMedicineDto.nome,
        dosage: createMedicineDto.dosagem,
        form: createMedicineDto.forma,
        quantity: createMedicineDto.quantidadi,
      },
    });
  }
}
