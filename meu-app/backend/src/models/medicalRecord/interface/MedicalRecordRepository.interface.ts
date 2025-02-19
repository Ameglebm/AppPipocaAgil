import { CreateDiabetesDTO, MetaGlicemicaDTO } from "../dtos/medicalRecordDTO";

export interface IMedicalRecordRepository {
    findByRecordId(userId: number): Promise<any | null>;
    createRecord(data: CreateDiabetesDTO): Promise<void>;
    registerGlucoseTarget(leitura: MetaGlicemicaDTO): Promise<void>;
    updateRecord(data: CreateDiabetesDTO, record: number): Promise<void>;
}
