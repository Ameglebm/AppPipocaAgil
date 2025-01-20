import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nomeProduto!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty()
    descricaoProduto!: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    precoProduto!: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    caminhoImg!: string;
}
