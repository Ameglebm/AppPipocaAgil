import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, isString } from 'class-validator';

type TipoUnidadeInsulina = 'mg ou algum q elas mandarem';

export class CreateUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do usuario' })
    @IsNumber( {}, {message: 'O ID do usuario deve ser number.' })
    userID!: number

    @ApiProperty({example: 'Insulina', description: 'Nome da insulina'})
    @IsString()
    @IsNotEmpty()
    nomeInsulina!: string

    @ApiProperty({example: 'unidade de medida', description: 'dosagem da insulina'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(['mg ou algum ali q elas passarem'])
    tipoUnidadesInsulina!: TipoUnidadeInsulina
}

export class GetUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuario'})
    @IsNumber({}, {message: 'O ID deve ser um numero'})
    id!: number
}

