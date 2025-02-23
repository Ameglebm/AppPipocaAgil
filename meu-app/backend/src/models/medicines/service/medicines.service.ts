import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserMedicineDTO, DeleteUserMedicineDTO, GetUserMedicineDTO, UpdateUserMedicineDTO } from '../dtos/medicinesDTO';
import { IMedicinesService } from '../interface/medicinesService.interface';
import { IMedicinesRepository } from '../interface/medicinesRepository.interface';

@Injectable()
export class MedicinesService implements IMedicinesService {

  constructor(
      @Inject('IMedicinesRepository') private readonly medicineRepository: IMedicinesRepository,
    ) {}

  async getUserMedicines(params: GetUserMedicineDTO): Promise<any[] | null> {
    const userId = parseInt(params.id, 10)

    const record = await this.medicineRepository.getUserMedicines(userId);
    
    if (!record) {
      throw new NotFoundException("Registro de medicamentos do usuário não encontrado.");
    }

    return record;
  }

  async createUserMedicine(data: CreateUserMedicineDTO): Promise<void> {
    await this.medicineRepository.createUserMedicine(data);
  }
 
  async updateUserMedicine(data: UpdateUserMedicineDTO): Promise<void> {
    await this.medicineRepository.updateUserMedicine(data);
  }
  
  async deleteUserMedicine(params: DeleteUserMedicineDTO): Promise<void> {
    const userId = parseInt(params.userId, 10);
    const id = parseInt(params.id, 10);

    await this.medicineRepository.deleteUserMedicine(userId, id);
  }
}
