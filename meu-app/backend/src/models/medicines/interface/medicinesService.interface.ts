import { CreateUserMedicineDTO, DeleteUserMedicineDTO, GetUserMedicineDTO, UpdateUserMedicineDTO } from "../dtos/medicinesDTO";

export interface IMedicinesService {
    getUserMedicines(userId: GetUserMedicineDTO): Promise<any[] | null>;
    createUserMedicine(data: CreateUserMedicineDTO): Promise<void>;
    updateUserMedicine(data: UpdateUserMedicineDTO): Promise<void>;
    deleteUserMedicine(params: DeleteUserMedicineDTO): Promise<void>;
}

