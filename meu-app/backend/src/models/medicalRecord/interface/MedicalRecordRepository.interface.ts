import { CreateDiabetesDTO, PostLeituraGlicemiaDTO, GetDiabetesDTO } from "../dtos/medicalRecordDTO";

export interface IMedicalRecordRepository {
    findByRecordId(userId: number): Promise<any | null>;
    createRecord(data: CreateDiabetesDTO): Promise<void>;
    registerLeituraGlicemia(leitura: PostLeituraGlicemiaDTO): Promise<void>;
    updateRecord(data: CreateDiabetesDTO, record: number): Promise<void>;

