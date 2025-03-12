import { CreateDiabetesDTO, GetDiabetesDTO, GetInsulinAdministrationDTO, GetUserGlicemiaDTO, InsulinAdministrationDTO, MetaGlicemicaDTO, UserGlicemiaDTO, CreateUserPressaoArterialDTO, GetUserPressaoArterialDTO } from '../dtos/medicalRecordDTO';

export interface IMedicalRecordService {
  createUserDiabetes(data: CreateDiabetesDTO): Promise<void>;
  getUserDiabetes(userId: GetDiabetesDTO): Promise<any | null>;
  metaGlicemica(leituraGlicemia: MetaGlicemicaDTO[]): Promise<void>;
  createInsulinAdministration(insulinAdministrationDTO: InsulinAdministrationDTO): Promise<void>;
  getInsulinAdministration(params: GetInsulinAdministrationDTO): Promise<any | null>;
  getTiposGlicemia(): Promise<any | null>
  createUserGlicemia(data: UserGlicemiaDTO): Promise<void>;
  getUserGlicemia(userId: GetUserGlicemiaDTO): Promise<any | null>;
  createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void>;
  getUserPressaoArterial(userId: GetUserPressaoArterialDTO): Promise<any | null>
}