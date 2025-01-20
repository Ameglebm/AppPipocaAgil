import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';

export class UpdateProdutoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    nomeProduto?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty({ required: false })
    descricaoProduto?: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    precoProduto?: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    caminhoImg?: string;
}
