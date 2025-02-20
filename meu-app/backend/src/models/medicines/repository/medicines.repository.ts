import { Injectable } from '@nestjs/common';
import { CreateMedicineDTO } from '../dtos/medicinesDTO';

@Injectable()
export class MedicinesRepository {
  constructor(private readonly prisma: { medicine: { create: (arg0: { data: CreateMedicineDTO; }) => any; }; }) {}

  async createMedicine(createMedicineDto: CreateMedicineDTO) {
    return await this.prisma.medicine.create({
      data: createMedicineDto,
    });
  }
}
