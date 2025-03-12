import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/middlewares/auth.guard';
import { CreateDiabetesDTO, GetDiabetesDTO, GetInsulinAdministrationDTO, InsulinAdministrationDTO, MetaGlicemicaDTO } from '../dtos/medicalRecordDTO';
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
  async createUserDiabetes(@Body() diabetesDto: CreateDiabetesDTO): Promise<void> {
    try {
      await this.medicalRecordService.createUserDiabetes(diabetesDto);
    } catch (error) {
      console.error('Erro ao cadastrar tipo de diabetes:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Obter registro de diabetes do usuário por ID' })
  @ApiResponse({ status: 200, description: 'Registro encontrado' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 404, description: 'Registro de diabetes não encontrado.' })
  @Get('diabetes/:id')
  async getUserDiabetes(@Param() params: GetDiabetesDTO) {
     try {
      const record = await this.medicalRecordService.getUserDiabetes(params);

      return { data: record };

    } catch (error) {

      if (error instanceof Error && error.message === 'Registro de diabetes não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao obter registro de diabetes:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Registrar leitura glicêmica do usuário' })
  @ApiResponse({ status: 201, description: 'Leitura glicêmica registrada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBody({ type: [MetaGlicemicaDTO] })
  @Post('metaGlicemica')
  async metaGlicemica(@Body() leituraGlicemia: MetaGlicemicaDTO[]): Promise<void> {
    try {
      await this.medicalRecordService.metaGlicemica(leituraGlicemia);
    } catch (error) {
      console.error('Erro ao registrar leitura glicêmica:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Registrar meio de administração de insulina do usuário' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Post('adminInsulina')
  async addInsulinAdministration(@Body() insulinAdministrationDTO: InsulinAdministrationDTO) {
    try {
      await this.medicalRecordService.createInsulinAdministration(insulinAdministrationDTO);
    } catch (error) {
      console.error('Erro ao registrar administração de insulina:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }
  
  @ApiOperation({ summary: 'Obter registro de administração de insulina do usuário por ID' })
  @ApiResponse({ status: 200, description: 'Registro encontrado' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 404, description: 'Registro de administração de insulina não encontrado.' })
  @Get('adminInsulina/:id')
  async getInsulinAdministration(@Param() params: GetInsulinAdministrationDTO) {
     try {
      const record = await this.medicalRecordService.getInsulinAdministration(params);

      return { data: record };

    } catch (error) {

      if (error instanceof Error && error.message === 'Registro de administração de insulina não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao obter registro de administração de insulina:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Retorna todos os tipos de diabetes' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 401, description: 'Erro de autenticação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('typesDiabetes')
  async getTypesDiabetes(): Promise<any | null> {
    try {
      return await this.medicalRecordService.getTypesDiabetes();
    } catch (error) {
      console.error('Erro ao buscar tipos de diabetes', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Retorna todos os tipos de tratamentos' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 401, description: 'Erro de autenticação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('typesTreatments')
  async getTypesTreatments(): Promise<any | null> {
    try {
      return await this.medicalRecordService.getTypesTreatments();
    } catch (error) {
      console.error('Erro ao buscar tipos de tratamentos', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

}
