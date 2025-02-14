import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
  @IsNumber({}, { message: 'O ID do usuário deve ser uma string.' })
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
