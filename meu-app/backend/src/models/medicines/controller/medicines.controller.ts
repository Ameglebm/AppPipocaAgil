import { Controller, Post, Body, Get, Param, NotFoundException, InternalServerErrorException, Patch, Delete, Inject } from '@nestjs/common';
import { MedicinesService } from '../service/medicines.service';
import { CreateUserMedicineDTO, DeleteUserMedicineDTO, GetUserMedicineDTO, UpdateUserMedicineDTO } from '../dtos/medicinesDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IMedicinesService } from '../interface/medicinesService.interface';

@Controller('userMedicines')
export class MedicinesController {
  constructor(@Inject('IMedicinesService') private readonly medicinesService: IMedicinesService) {}

  @ApiOperation({ summary: 'Registrar medicamento do usuário' })
  @ApiResponse({ status: 201, description: 'Medicamento do usuário registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Post()
  async createUserMedicine(@Body() createMedicineDto: CreateUserMedicineDTO) {
    return await this.medicinesService.createUserMedicine(createMedicineDto);
  }

  @ApiOperation({ summary: 'Buscar medicamentos do usuário' })
  @ApiResponse({ status: 200, description: 'Registro encontrado.' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get(':id')
  async getUserMedicine(@Param() params: GetUserMedicineDTO) {
    try {
      const record = await this.medicinesService.getUserMedicines(params);

      return { data: record };

    } catch (error) {

      if (error instanceof Error && error.message === 'Registro de medicamentos do usuário não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao obter medicamentos do usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Atualizar o medicamento do usuário' })
  @ApiResponse({ status: 201, description: 'Medicamento do usuário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Patch()
  async updateUserMedicine(@Body() updateMedicineDto: UpdateUserMedicineDTO ) {
    return await this.medicinesService.updateUserMedicine(updateMedicineDto);
  }

  @ApiOperation({ summary: 'Deletar o medicamento do usuário' })
  @ApiResponse({ status: 201, description: 'Medicamento do usuário deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Delete(':userId/medicine/:id')
  async deleteUserMedicine(@Param() params: DeleteUserMedicineDTO) {
    return await this.medicinesService.deleteUserMedicine(params);
  }
  
}
