import { CreateDiabetesDTO, GetDiabetesDTO, GetInsulinAdministrationDTO, InsulinAdministrationDTO, MetaGlicemicaDTO } from '../dtos/medicalRecordDTO';

export interface IMedicalRecordService {
  createUserDiabetes(data: CreateDiabetesDTO): Promise<void>;
  getUserDiabetes(userId: GetDiabetesDTO): Promise<any | null>;
  metaGlicemica(leituraGlicemia: MetaGlicemicaDTO[]): Promise<void>;
  createInsulinAdministration(insulinAdministrationDTO: InsulinAdministrationDTO): Promise<void>;
  getInsulinAdministration(params: GetInsulinAdministrationDTO): Promise<any | null>;
  getTypesDiabetes(): Promise<any | null>;
  getTypesTreatments(): Promise<any | null>;
}