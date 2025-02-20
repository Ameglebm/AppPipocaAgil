import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMedicineDTO {
  @ApiProperty({ example: 'insulina', description: 'Nome do medicamento' })
    @IsString()
    @IsNotEmpty()
    nome!: string;

  @ApiProperty({ example: '500mg', description: 'Dosagem do medicamento' })
    @IsString()
    @IsNotEmpty()
    dosagem!: string;

  @ApiProperty({ example: 'injecao', description: 'Forma do medicamento' })
    @IsString()
    @IsNotEmpty()
    forma!: string;

  @ApiProperty({ example: '20', description: 'Quantidade do medicamento' })
    @IsNumber()
    quantidadi!: number;
}
