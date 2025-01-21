import {
    IsString,
    IsBoolean,
    IsNumber,
    IsNotEmpty,
    Matches,
    IsIn,
    Validate,
} from 'class-validator';
import { IsValidCep } from '../../validators/cepValidator';
import { IsValidCountry } from '../../validators/paisValidator';
import { IsValidState } from '../../validators/estadoValidator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLojaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'O nome da loja é um campo obrigatório.' })
    @IsString({ message: 'O nome da loja deve ser uma string.' })
    storeName!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'O tipo da loja é um campo  obrigatório.' })
    @IsString({ message: 'O tipo da esta inválido.' })
    @IsIn(['LOJA', 'PDV'], {
        message: 'O tipo da loja deve ser "LOJA" ou "PDV".',
    })
    type!: string;

    @ApiProperty()
    @IsNotEmpty({
        message: 'O campo de disponibilidade de estoque deve estar preenchido',
    })
    @IsBoolean({
        message:
            'O campo disponível no estoque deve ser preenchido com "true" ou "false".',
    })
    takeOutInStore!: boolean;

    @ApiProperty()
    @IsNotEmpty({ message: 'O Tempo de preparo é um campo obrigatório.' })
    @IsNumber({}, { message: 'O tempo de preparo deve ser um número (dias).' })
    shippingTimeInDays!: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'A latitude da loja é um campo obrigatório.' })
    @IsString({
        message: 'A latitude deve ser uma coordenada válida entre -90 e 90.',
    })
    @Matches(
        /^(\+|-)?(?:90(?:\.0+)?|\d(?:\.\d+)?|\d{1,2}(?:\.\d+)?|(?:0?\d{1,2}|1[0-7]\d)(?:\.\d+))$/,
        { message: 'A latitude deve ser uma coordenada válida entre -90 e 90.' }
    )
    latitude!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'A longitude da loja é um campo obrigatório.' })
    @IsString({
        message: 'A latitude deve ser uma coordenada válida entre -90 e 90.',
    })
    @Matches(
        /^(\+|-)?(?:180(?:\.0+)?|\d(?:\.\d+)?|\d{1,2}(?:\.\d+)?|(?:0?\d{1,2}|1[0-7]\d)(?:\.\d+))$/,
        {
            message:
                'A longitude deve ser uma coordenada válida entre -180 e 180.',
        }
    )
    longitude!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'O código postal da loja é um campo obrigatório.' })
    @IsString({ message: 'O código postal deve estar no formato 99999-999.' })
    @Matches(/^[0-9]{5}-[0-9]{3}$/, {
        message: 'O código postal deve estar no formato 99999-999.',
    })
    @Validate(IsValidCep, { message: 'O CEP informado é inválido.' })
    postalCode!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'O estado da loja é um campo obrigatório.' })
    @IsString({ message: 'O estado deve ser uma string.' })
    @Validate(IsValidState, { message: 'O estado informado é inválido.' })
    state!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'A cidade da loja é um campo obrigatório.' })
    @IsString({ message: 'A cidade deve ser uma string.' })
    city!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'O país da loja é um campo obrigatório.' })
    @IsString({ message: 'O país deve ser uma string.' })
    @Validate(IsValidCountry, { message: 'O País informado é inválido.' })
    country!: string;
}
