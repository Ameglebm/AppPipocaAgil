import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
  @IsNumber({}, { message: 'O ID do usuário deve ser uma string.' })
  userId!: number;

  @ApiProperty({ example: '1', description: 'ID do tipo de diabetes.' })
  @IsNumber({}, { message: 'O ID do tipo de diabetes deve ser uma string.' })
  diabetesId!: number;
}

export class GetDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}

export interface ResponseDTO {
  id: number;
  userId: number;
  diabetesId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class MetaGlicemicaDTO {
  @ApiProperty({ example: 'number', description: 'ID do usuário.' })
  @IsNumber({ }, { message: 'ID do usuário deve ser um número.' })
  userId!: number;
  
  @ApiProperty({ example: 'number', description: 'ID do período.' })
  @IsNumber({ }, { message: 'Período deve ser um número.' })
  periodoId!: number;
  
  @ApiProperty({ example: 'number', description: 'Meta mínima.' })
  @IsNumber({ }, { message: 'Meta mínima deve ser um número.' })
  metaMin!: number;
  
  @ApiProperty({ example: 'number', description: 'Meta ideal.' })
  @IsNumber({ }, { message: 'Meta ideal deve ser um número.' })
  metaIdeal!: number;
  
  @ApiProperty({ example: 'number', description: 'Meta máxima.' })
  @IsNumber({ }, { message: 'Meta máxima deve ser um número.' })
  metaMax!: number;
}

export class InsulinAdministrationDTO {
  @ApiProperty({ example: 'number', description: 'ID do usuário.' })
  @IsNumber({ }, { message: 'ID do usuário deve ser um número.' })
  userId!: number;

  @ApiProperty({ example: 'number', description: 'ID da administração de insulina.' })
  @IsNumber({ }, { message: 'Administração de insulina deve ser um número.' })
  adminInsulinaId!: number;
}

export class GetInsulinAdministrationDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}

export class UserGlicemiaDTO {
  @ApiProperty({ example: 'number', description: 'ID do usuário.' })
  @IsNumber({ }, { message: 'ID do usuário deve ser um número.' })
  userId!: number;

  @ApiProperty({ example: 'number', description: 'ID do tipo de glicemia.' })
  @IsNumber({ }, { message: 'Tipo de glicemia deve ser um número.' })
  glicemiaId!: number;

  @ApiProperty({ example: 'number', description: 'Valor da glicemia do usuário.' })
  @IsNumber({ }, { message: 'Valor da glicemia do usuário deve ser um número.' })
  value!: number;
}

export class GetUserGlicemiaDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}

// date e hora ajustado e retirado o id
export class CreateUserPressaoArterialDTO {
  @ApiProperty({ example: '1', description: 'ID do usuário.'})
  @IsNumber({}, { message: 'ID do usuário deve ser um número.'})
  userId!: number
  
  @ApiProperty({ example: '10', description: 'Valor da pressão arterial sistólica.'})
  @IsNumber({}, { message: 'Valor da pressão arterial sistólica deve ser um número.'})
  sistolica!: number

  @ApiProperty({ example: '80', description: 'Valor da pressão arterial diastólica.'})
  @IsNumber({}, { message: 'Valor da pressão arterial distólica deve ser um número.'})
  diastolica!: number

  @ApiProperty({ example: '07/10/2024', description: 'Data da aferição.'})
  @IsString({ message: 'Valor da data deve ser uma string.'})
  date!: string

  @ApiProperty({ example: '11:00', description: 'Hora da aferição.'})
  @IsString({ message: 'O valor da hora deve ser uma string.'})
  time!: string
}

export class GetUserPressaoArterialDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;

  @ApiProperty({ example: 'number', description: 'ID do usuário.' })
  @IsNumber({}, { message: 'ID do usuário deve ser um número.'})
  userId!: number;
}
