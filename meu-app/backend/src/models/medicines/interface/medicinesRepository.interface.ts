import { CreateUserMedicineDTO, UpdateUserMedicineDTO } from "../dtos/medicinesDTO";

export interface IMedicinesRepository {
  getUserMedicines(userId: number): Promise<any[] | null>;
  createUserMedicine(data: CreateUserMedicineDTO): Promise<void>;
  updateUserMedicine(data: UpdateUserMedicineDTO): Promise<void>;
  deleteUserMedicine(userId: number, id: number): Promise<void>;
}
