import { CreateDiabetesDTO, GetDiabetesDTO, PostLeituraGlicemiaDTO } from '../dtos/medicalRecordDTO';

export interface IMedicalRecordService {
  createUserDiabetes(data: CreateDiabetesDTO): Promise<void>;
  getUserDiabetes(userId: GetDiabetesDTO): Promise<any | null>;
  postLeituraGlicemia(leituraGlicemia: PostLeituraGlicemiaDTO[]): Promise<void>;
}
