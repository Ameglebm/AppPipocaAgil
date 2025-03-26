
import { Inject, NotFoundException } from "@nestjs/common";
import { CreateDiabetesDTO, CreateUserPressaoArterialDTO, GetDiabetesDTO, GetInsulinAdministrationDTO, GetUserGlicemiaDTO, GetUserPressaoArterialDTO, InsulinAdministrationDTO, MetaGlicemicaDTO, ResponseDTO, UserGlicemiaDTO } from "../dtos/medicalRecordDTO";
import { IMedicalRecordService } from "../interface/medicalRecordService.interface";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";

export class MedicalRecordService implements IMedicalRecordService {
  constructor(
    @Inject('IMedicalRecordRepository') private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}
  createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserPressaoArterial(userId: GetUserPressaoArterialDTO): Promise<any | null> {
    throw new Error("Method not implemented.");
  }

  async createUserDiabetes(data: CreateDiabetesDTO): Promise<void> {

    const record: ResponseDTO = await this.medicalRecordRepository.getUserDiabetesByUserId(data.userId);

    if(!record) {
      await this.medicalRecordRepository.createUserDiabetesRecord(data);
    } else {
      const id = record.id;
      await this.medicalRecordRepository.updateUserDiabetesRecord(data, id);
    }
    
  }

  async getUserDiabetes(params: GetDiabetesDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10)

    const record = await this.medicalRecordRepository.getUserDiabetesByUserId(userId);
    
    if (record.length === 0)  {
      throw new NotFoundException("Registro de diabetes não encontrado.");
    }

    return record;
  }
  
  async metaGlicemica(leituraGlicemia: MetaGlicemicaDTO[]): Promise<void> {
    for (const leitura of leituraGlicemia) {
      await this.medicalRecordRepository.registerGlucoseTarget(leitura);
    }
  }

  async createInsulinAdministration(insulinAdministrationDTO: InsulinAdministrationDTO): Promise<void> {
    const record: ResponseDTO = await this.medicalRecordRepository.getInsulinAdministrationByUserId(insulinAdministrationDTO.userId);

    if(!record) {
      await this.medicalRecordRepository.createInsulinAdministrationRecord(insulinAdministrationDTO);
    } else {
      const id = record.id;
      await this.medicalRecordRepository.updateInsulinAdministrationRecord(insulinAdministrationDTO, id);
    }
  }

  async getInsulinAdministration(params: GetInsulinAdministrationDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10)

    const record = await this.medicalRecordRepository.getInsulinAdministrationByUserId(userId);
    
    if (record.length === 0)  {
      throw new NotFoundException("Registro de administração de insulina não encontrado.");
    }

    return record;
  }

  async getTiposGlicemia(): Promise<any | null> {

    const record = await this.medicalRecordRepository.getTiposGlicemia();
    
    if (record.length === 0)  {
      throw new NotFoundException("Registro de tipo de glicemia não encontrado.");
    }

    return record;
  }

  async createUserGlicemia(data: UserGlicemiaDTO): Promise<void> {
    await this.medicalRecordRepository.createUserGlicemia(data);
  }

  async getUserGlicemia(params: GetUserGlicemiaDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10)

    const record = await this.medicalRecordRepository.getUserGlicemia(userId);
    
    if (record.length === 0) {
      throw new NotFoundException("Registro de glicemia do usuário não encontrado.");
    }

    return record;
  }
}