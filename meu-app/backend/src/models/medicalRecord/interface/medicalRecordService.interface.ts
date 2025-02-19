import { CreateDiabetesDTO, GetDiabetesDTO, MetaGlicemicaDTO } from '../dtos/medicalRecordDTO';

export interface IMedicalRecordService {
  createUserDiabetes(data: CreateDiabetesDTO): Promise<void>;
  getUserDiabetes(userId: GetDiabetesDTO): Promise<any | null>;
  metaGlicemica(leituraGlicemia: MetaGlicemicaDTO[]): Promise<void>;
}
