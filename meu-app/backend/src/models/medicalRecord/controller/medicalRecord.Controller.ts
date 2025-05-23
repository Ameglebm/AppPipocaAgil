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
import { CreateDiabetesDTO, GetDiabetesDTO, GetInsulinAdministrationDTO, GetUserGlicemiaDTO, InsulinAdministrationDTO, MetaGlicemicaDTO, UserGlicemiaDTO, CreateUserPressaoArterialDTO, GetUserPressaoArterialDTO, UserPesoDTO, GetUserPesoDTO, getUserRecordLogDTO } from '../dtos/medicalRecordDTO';
import { IMedicalRecordService } from '../interface/medicalRecordService.interface';

@UseGuards(AuthGuard)
@ApiTags('medicalRecord')
@Controller('medicalRecord') 
export class MedicalRecordController {
  constructor(@Inject('IMedicalRecordService') private readonly medicalRecordService: IMedicalRecordService) {}

  @ApiOperation({ summary: 'Cadastrar tipo de diabetes do usuário.' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Post('diabetes')
  async createUserDiabetes(@Body() diabetesDto: CreateDiabetesDTO): Promise<void> {
    try {
      await this.medicalRecordService.createUserDiabetes(diabetesDto);
    } catch (error) {
      console.error('Erro ao cadastrar tipo de diabetes:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Obter registro de diabetes do usuário por ID.' })
  @ApiResponse({ status: 200, description: 'Registro encontrado.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
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
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Registrar leitura glicêmica do usuário.' })
  @ApiResponse({ status: 201, description: 'Leitura glicêmica registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBody({ type: [MetaGlicemicaDTO] })
  @Post('metaGlicemica')
  async metaGlicemica(@Body() leituraGlicemia: MetaGlicemicaDTO[]): Promise<void> {
    try {
      await this.medicalRecordService.metaGlicemica(leituraGlicemia);
    } catch (error) {
      console.error('Erro ao registrar leitura glicêmica:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Registrar meio de administração de insulina do usuário.' })
  @ApiResponse({ status: 201, description: 'Registro de administração de insulina encontrado.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Post('adminInsulina')
  async addInsulinAdministration(@Body() insulinAdministrationDTO: InsulinAdministrationDTO) {
    try {
      await this.medicalRecordService.createInsulinAdministration(insulinAdministrationDTO);
    } catch (error) {
      console.error('Erro ao registrar administração de insulina:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }
  
  @ApiOperation({ summary: 'Obter registro de administração de insulina do usuário por ID.' })
  @ApiResponse({ status: 200, description: 'Registro encontrado;' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
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
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Obter tipos de glicemia.' })
  @ApiResponse({ status: 200, description: 'Registro encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de tipo de glicemia não encontrado.' })
  @Get('tiposGlicemia')
  async getTiposGlicemia() {
     try {
      const data = await this.medicalRecordService.getTiposGlicemia();

      return { data };

    } catch (error) {

      if (error instanceof Error && error.message === 'Registro de tipo de glicemia não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao obter registro de tipos de glicemia:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Registrar glicemia do usuário.' })
  @ApiResponse({ status: 201, description: 'Glicemia do usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Post('userGlicemia')
  async addUserGlicemia(@Body() dto: UserGlicemiaDTO) {
    try {
      await this.medicalRecordService.createUserGlicemia(dto);
    } catch (error) {
      console.error('Erro ao registrar a glicemia do usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Obter registro de glicemia do usuário por ID.' })
  @ApiResponse({ status: 200, description: 'Registro encontrado.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 404, description: 'Registro de glicemia do usuário não encontrado.' })
  @Get('userGlicemia/:id')
  async getUserGlicemia(@Param() params: GetUserGlicemiaDTO) {
     try {
      const data = await this.medicalRecordService.getUserGlicemia(params);

      return { data };

    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Erro ao obter registro de glicemia do usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  // Ajustar aqui
  @ApiOperation({ summary: 'Registrar pressão arterial do usuário.' })
  @ApiResponse({ status: 201, description: 'Pressão arterial registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.'})
  @Post('pressaoArterial')
  async createUserPressaoArterial(@Body() data: CreateUserPressaoArterialDTO) {
    try {
      await this.medicalRecordService.createUserPressaoArterial(data);
    } catch (error) {
      console.error('Erro ao criar registro de pressão arterial:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }
  
// Ajustar aqui
  @ApiOperation({ summary: 'Obter registro de pressão arterial do usuário por ID.'})
  @ApiResponse({ status: 200, description: 'Registro encontrado.'})
  @ApiResponse({ status: 400, description: 'Erro de validação.'})
  @ApiResponse({ status: 404, description: 'Registro de pressão arterial não encontrado.'})
  @Get('pressaoArterial/:userId')
  async getUserPressaoArterial(@Param() params: GetUserPressaoArterialDTO) {
    try {
      const data = await this.medicalRecordService.getUserPressaoArterial(params);

      return { data };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Erro ao obter registro de pressão arterial:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Retorna todos os tipos de diabetes' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('typesDiabetes')
  async getTypesDiabetes(): Promise<any | null> {
    try {
      return await this.medicalRecordService.getTypesDiabetes();
    } catch (error) {
      if (error instanceof Error && error.message === 'Tipos de diabetes não encontrados') {
        throw new NotFoundException(error.message);
      }
      console.error('Erro ao buscar tipos de diabetes', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Retorna todos os tipos de tratamentos' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('typesTreatments')
  async getTypesTreatments(): Promise<any | null> {
    try {
      return await this.medicalRecordService.getTypesTreatments();
    } catch (error) {
      if (error instanceof Error && error.message === 'Tipos de tratamentos não encontrados') {
        throw new NotFoundException(error.message);
      }
      console.error('Erro ao buscar tipos de tratamentos', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('userPeso/:id')
  async getUserPeso(@Param() params: GetUserPesoDTO) {
     try {
      const data = await this.medicalRecordService.getUserPeso(params);
      return { data };
    } catch (error) {
      if (error instanceof Error && error.message === 'Registro de peso não encontrado') {
        throw new NotFoundException(error.message);
      }
      console.error('Erro ao obter registro de peso:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Registra o peso do usuário' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBody({ type: UserPesoDTO })
  @Post('userPeso')
  async registerPeso(@Body() peso: UserPesoDTO): Promise<void> {
    try {
      await this.medicalRecordService.registerPeso(peso);
    } catch (error) {
      console.error('Erro ao registrar peso', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @ApiOperation({ summary: 'Retorna o histórico de registros do usuário' })
  @ApiResponse({ status: 200, description: 'Requisição bem-sucedida' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('userHistory/:id')
  async getUserRecordLog(@Param() params: getUserRecordLogDTO) {
     try {
      const data = await this.medicalRecordService.getUserRecordLog(params);
      return { data };
    } catch (error) {
      if (error instanceof Error && error.message === 'Registros do usuário não encontrados') {
        throw new NotFoundException(error.message);
      }
      console.error('Erro ao obter registros do usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }
}
