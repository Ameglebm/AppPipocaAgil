import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserParamsDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}

export class DeleteUserParamsDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}