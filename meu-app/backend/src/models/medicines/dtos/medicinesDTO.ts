import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

type TipoDosagens = 'mL' | 'IU' | '%' | 'mcg' | 'mg' | 'g';
 
export class CreateUserMedicineDTO {

  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsNumber({}, { message: 'O ID do usuário deve ser um number.' })
  userId!: number;

  @ApiProperty({ example: 'insulina', description: 'Nome do medicamento.' })
  @IsString()
  @IsNotEmpty()
  nomeMedicamento!: string;

  @ApiProperty({ example: '500mg', description: 'Dosagem do medicamento.' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['mL', 'UI', '%', 'mcg', 'mg', 'g'])
  tipoDosagem!: TipoDosagens;

  @ApiProperty({ example: '1', description: 'ID do Tipo de Tratamento.' })
  @IsNumber()
  @IsNotEmpty()
  tipoTratamentoId!: number;

  @ApiProperty({ example: '1 comprimido', description: 'Dosagem da medicação.' })
  @IsString()
  @IsNotEmpty()
  dosagemPorAdministracao!: string;

  @ApiProperty({ example: '10', description: 'Quantidade de doses restantes.' })
  @IsNumber()
  @IsNotEmpty()
  dosesRestantes!: number;
}

export class GetUserMedicineDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}

export class UpdateUserMedicineDTO {
  @ApiProperty({ example: '123', description: 'ID do medicamento.' })
  @IsNumber({}, { message: 'O ID do medicamento deve ser um number.' })
  id!: number;

  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsNumber({}, { message: 'O ID do usuário deve ser um number.' })
  userId!: number;

  @ApiProperty({ example: 'insulina', description: 'Nome do medicamento.' })
  @IsString()
  @IsNotEmpty()
  nomeMedicamento!: string;

  @ApiProperty({ example: '500mg', description: 'Dosagem do medicamento.' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['mg', 'ml', 'g', 'UI', 'mgc', '%'])
  tipoDosagem!: TipoDosagens;

  @ApiProperty({ example: '1', description: 'ID do Tipo de Tratamento.' })
  @IsNumber()
  @IsNotEmpty()
  tipoTratamentoId!: number;

  @ApiProperty({ example: '1 comprimido', description: 'Dosagem da medicação.' })
  @IsString()
  @IsNotEmpty()
  dosagemPorAdministracao!: string;

  @ApiProperty({ example: '10', description: 'Quantidade de doses restantes.' })
  @IsNumber()
  @IsNotEmpty()
  dosesRestantes!: number;
}

export class DeleteUserMedicineDTO {
  @ApiProperty({ example: '123', description: 'ID do usuário.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  userId!: string;

  @ApiProperty({ example: '123', description: 'ID do medicamento.' })
  @IsString({ message: 'O ID deve ser uma string.' })
  id!: string;
}