import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DiabetesDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário' })
  @IsString({ message: 'O ID do usuário deve ser uma string.' })
  userId!: string;

  @ApiProperty({ example: '456', description: 'ID do tipo de diabetes' })
  @IsString({ message: 'O ID do tipo de diabetes deve ser uma string.' })
  diabeteId!: string;
}
