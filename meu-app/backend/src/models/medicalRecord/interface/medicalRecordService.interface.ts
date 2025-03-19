import { CreateDiabetesDTO, GetDiabetesDTO, GetInsulinAdministrationDTO, GetUserGlicemiaDTO, InsulinAdministrationDTO, MetaGlicemicaDTO, UserGlicemiaDTO, UserPesoDTO, GetUserPesoDTO } from '../dtos/medicalRecordDTO';

export interface IMedicalRecordService {
  createUserDiabetes(data: CreateDiabetesDTO): Promise<void>;
  getUserDiabetes(userId: GetDiabetesDTO): Promise<any | null>;
  metaGlicemica(leituraGlicemia: MetaGlicemicaDTO[]): Promise<void>;
  createInsulinAdministration(insulinAdministrationDTO: InsulinAdministrationDTO): Promise<void>;
  getInsulinAdministration(params: GetInsulinAdministrationDTO): Promise<any | null>;
  getTiposGlicemia(): Promise<any | null>
  createUserGlicemia(data: UserGlicemiaDTO): Promise<void>;
  getUserGlicemia(userId: GetUserGlicemiaDTO): Promise<any | null>;
  getTypesDiabetes(): Promise<any | null>;
  getTypesTreatments(): Promise<any | null>;
  registerPeso(peso: UserPesoDTO): Promise<void>;
  getUserPeso(params: GetUserPesoDTO): Promise<any | null>;
}