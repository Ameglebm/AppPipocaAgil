import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
  @IsString({ message: 'O ID do usuário deve ser uma string.' })
  userId!: string;

  @ApiProperty({ example: '1', description: 'ID do tipo de diabetes' })
  @IsString({ message: 'O ID do tipo de diabetes deve ser uma string.' })
  diabetesId!: string;
}

export class GetDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
  @IsString({ message: 'O ID do usuário deve ser uma string.' })
  userId!: string;
}

export class PostLeituraGlicemiaDTO {
  userId!: number;
  periodoId!: number;
  metaMin!: number;
  metaIdeal!: number;
  metaMax!: number;
}
