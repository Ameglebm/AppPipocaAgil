import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
  @IsNumber({}, { message: 'O ID do usuário deve ser um number.' })
  userId!: number;

  @ApiProperty({ example: '1', description: 'ID do tipo de diabetes' })
  @IsNumber({}, { message: 'O ID do tipo de diabetes deve ser uma string.' })
  diabetesId!: number;
}

export class GetDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
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
  @ApiProperty({ example: 'number', description: 'ID do usuário' })
  @IsNumber({ }, { message: 'ID do usuário deve ser um número' })
  userId!: number;
  
  @ApiProperty({ example: 'number', description: 'ID do período' })
  @IsNumber({ }, { message: 'Período deve ser um número' })
  periodoId!: number;
  
  @ApiProperty({ example: 'number', description: 'Meta mínima' })
  @IsNumber({ }, { message: 'Meta mínima deve ser um número' })
  metaMin!: number;
  
  @ApiProperty({ example: 'number', description: 'Meta ideal' })
  @IsNumber({ }, { message: 'Meta ideal deve ser um número' })
  metaIdeal!: number;
  
  @ApiProperty({ example: 'number', description: 'Meta máxima' })
  @IsNumber({ }, { message: 'Meta máxima deve ser um número' })
  metaMax!: number;
}
