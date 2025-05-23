import { Inject, NotFoundException } from "@nestjs/common";
import { CreateDiabetesDTO,  GetDiabetesDTO, GetInsulinAdministrationDTO, GetUserGlicemiaDTO, InsulinAdministrationDTO, MetaGlicemicaDTO, ResponseDTO, UserGlicemiaDTO, CreateUserPressaoArterialDTO, GetUserPressaoArterialDTO, UserPesoDTO, GetUserPesoDTO, getUserRecordLogDTO } from "../dtos/medicalRecordDTO";
import { IMedicalRecordService } from "../interface/medicalRecordService.interface";
import { IMedicalRecordRepository } from "../interface/MedicalRecordRepository.interface";

export class MedicalRecordService implements IMedicalRecordService {
  constructor(
    @Inject('IMedicalRecordRepository') private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}
  async createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void> {
    await this.medicalRecordRepository.createUserPressaoArterial(data)
  }

  async getUserPressaoArterial(params: GetUserPressaoArterialDTO): Promise<any | null> {
    const userId = parseInt(params.userId, 10)
    const record = await this.medicalRecordRepository.getUserPressaoArterial(userId);
    
    if (record.length === 0) {
      throw new NotFoundException("Registro de pressão arterial do usuário não encontrado.");
    }

    return record;
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

  async getTypesDiabetes(): Promise<any | null> {
    const allTypesDiabetes = await this.medicalRecordRepository.findAllTypesDiabetes();
    if(allTypesDiabetes.length === 0) {
        throw new NotFoundException('Tipos de diabetes não encontrados');
    }
    return allTypesDiabetes;
  }
  
  async getTypesTreatments(): Promise<any | null> {
    const allTypesTreatments = await this.medicalRecordRepository.findAllTypesTreatments();
    if(allTypesTreatments.length === 0) {
        throw new NotFoundException('Tipos de tratamentos não encontrados');
    }
    return allTypesTreatments;
  }
  
  async getUserPeso(params: GetUserPesoDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10);
    const record = await this.medicalRecordRepository.getUserPeso(userId);
    if(record.length === 0) {
      throw new NotFoundException("Registro de peso não encontrado");
    }
    for(let i = 0; i < record.length; i++) {
      if(i === record.length - 1) {
        record[i].weightDifference = "";
      } else if(record[i].peso > record[i+1].peso) {
        record[i].weightDifference = "maior";
      } else if(record[i].peso === record[i+1].peso) {
        record[i].weightDifference = "";
      } else {
        record[i].weightDifference = "menor";
      }
    }
    return record;
  }

  async registerPeso(peso: UserPesoDTO): Promise<void> {
    await this.medicalRecordRepository.registerPeso(peso);
  }

  async getUserRecordLog(params: getUserRecordLogDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10);
    const userRecordLog = await this.medicalRecordRepository.logAllUserRecords(userId);
    if(userRecordLog.length === 0) {
      throw new NotFoundException("Registros do usuário não encontrados");
    }
    return userRecordLog;
  }

}

