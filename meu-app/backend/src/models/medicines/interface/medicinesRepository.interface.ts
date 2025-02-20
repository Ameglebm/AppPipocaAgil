export interface IMedicinesRepository {
  getAllMedicines(): Promise<any[]>;
  createMedicine(data: any): Promise<void>;
  findMedicineById(id: number): Promise<any | null>;
  updateMedicine(id: number, data: any): Promise<void>;
  deleteMedicine(id: number): Promise<void>;
}
