import { CreateDiabetesDTO, InsulinAdministrationDTO, MetaGlicemicaDTO } from "../dtos/medicalRecordDTO";

export interface IMedicalRecordRepository {
    getUserDiabetesByUserId(userId: number): Promise<any | null>;
    createUserDiabetesRecord(data: CreateDiabetesDTO): Promise<void>;
    updateUserDiabetesRecord(data: CreateDiabetesDTO, record: number): Promise<void>;
    registerGlucoseTarget(leitura: MetaGlicemicaDTO): Promise<void>;
    createInsulinAdministrationRecord(data: InsulinAdministrationDTO): Promise<void>;
    getInsulinAdministrationByUserId(userId: number): Promise<any | null>;
    updateInsulinAdministrationRecord(data: InsulinAdministrationDTO, record: number): Promise<void>;
    findAllTypesDiabetes(): Promise<string[]>;
}