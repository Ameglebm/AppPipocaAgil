export interface IMedicalRecordRepository {
    findByPatientId(patientId: number): Promise<any | null>;
    findByRecordId(recordId: number): Promise<any | null>;
    
    createRecord(data: {
      patientId: number;
      recordDate: Date;
      diagnosis: string;
      treatment: string;
    }): Promise<any>;
  
    updateRecord(recordId: number, data: {
      diagnosis?: string;
      treatment?: string;
      recordDate?: Date;
    }): Promise<any>;
  
    deleteRecord(recordId: number): Promise<any>;
  }
  