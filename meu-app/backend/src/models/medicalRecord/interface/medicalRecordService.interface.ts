import { DiabetesDTO } from '../dtos/medicalRecordDTO';

export interface IMedicalRecordService {
  createUserDiabetes(data: DiabetesDTO): Promise<any>;
  getUserDiabetes(userId: string): Promise<any | null>;
  deleteUserDiabetes(userId: string): Promise<void>;
}
