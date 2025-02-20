import { Controller, Post, Body } from '@nestjs/common';
import { MedicinesService } from '../service/medicines.service';
import { CreateMedicineDTO } from '../dtos/medicinesDTO';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  async addMedicine(@Body() createMedicineDto: CreateMedicineDTO) {
    return await this.medicinesService.addMedicine(createMedicineDto);
  }
  
}
