export interface IMedicinesService {
    getMedicines(): Promise<any[]>;
    createMedicine(data: any): Promise<void>;
    getMedicineById(id: number): Promise<any | null>;
    updateMedicine(id: number, data: any): Promise<void>;
    deleteMedicine(id: number): Promise<void>;
}

