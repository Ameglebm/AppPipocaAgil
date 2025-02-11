import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    Body,
    NotFoundException,
    InternalServerErrorException,
    Inject,
    UseGuards,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { AuthGuard } from '@/middlewares/auth.guard';
  import { DiabetesDTO } from '../dtos/medicalRecordDTO';
  import { IMedicalRecordService } from '../interface/medicalRecordService.interface';
  
  @UseGuards(AuthGuard)
  @ApiTags('medicalRecord')
  @Controller('medicalRecord')
  export class MedicalRecordController {
    constructor(@Inject('IMedicalRecordService') private readonly medicalRecordService: IMedicalRecordService) {}
  
    @ApiOperation({ summary: 'Cadastrar tipo de diabetes do usuário' })
    @ApiResponse({ status: 201, description: 'Registro criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro de validação' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Post('diabetes')
    async createUserDiabetes(@Body() diabetesDto: DiabetesDTO) {
      try {
        const result = await this.medicalRecordService.createUserDiabetes(diabetesDto);
        return { message: 'Registro criado com sucesso', data: result };
      } catch (error) {
        console.error('Erro ao cadastrar tipo de diabetes:', error);
        throw new InternalServerErrorException('Erro interno do servidor');
      }
    }
  
    @ApiOperation({ summary: 'Obter registro de diabetes do usuário por ID' })
    @ApiResponse({ status: 200, description: 'Registro encontrado' })
    @ApiResponse({ status: 404, description: 'Registro não encontrado' })
    @Get(':id')
    async getUserDiabetes(@Param('id') id: string) {
      try {
        const record = await this.medicalRecordService.getUserDiabetes(id);
        if (!record) {
          throw new NotFoundException('Registro não encontrado');
        }
        return { data: record };
      } catch (error) {
        console.error('Erro ao obter registro de diabetes:', error);
        throw new InternalServerErrorException('Erro interno do servidor');
      }
    }
  
    @ApiOperation({ summary: 'Deletar registro de diabetes do usuário por ID' })
    @ApiResponse({ status: 200, description: 'Registro deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Registro não encontrado' })
    @Delete(':id')
    async deleteUserDiabetes(@Param('id') id: string) {
      try {
        await this.medicalRecordService.deleteUserDiabetes(id);
        return { message: 'Registro deletado com sucesso' };
      } catch (error) {
        console.error('Erro ao deletar registro de diabetes:', error);
        throw new InternalServerErrorException('Erro interno do servidor');
      }
    }
  }
  