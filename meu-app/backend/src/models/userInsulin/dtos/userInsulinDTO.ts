import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, } from 'class-validator';

export class CreateUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do usuario' })
    @IsNumber( {}, {message: 'O ID do usuario deve ser number.' })
    userId!: number

    @ApiProperty({example: 'Insulina', description: 'Nome da insulina'})
    @IsString({ message: 'O nome da insulina deve ser uma string' })
    @IsNotEmpty()
    insulina!: string

    @ApiProperty({example: 'Dosagem', description: 'dosagem da insulina'})
    @IsNumber({}, {message: 'A dosagem deve ser um numero'})
    @IsNotEmpty()
    dosagemQtd!: number
}

// Ajustado para uma string
export class GetUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuario'})
    @IsString({ message: 'O ID do usuario deve ser uma string'})
    id!: string
}

export class PatchUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do registro'})
    @IsNumber({}, {message: 'O ID do registro deve ser um numero'}) 
    id!: number

    @ApiProperty({example: '1', description: 'ID do usuario'})
    @IsNumber({}, {message: 'O ID do usuario deve ser um numero'}) 
    userId!: number

    @ApiProperty({ example: 'Dosagem', description: 'dosagem da insulina'})
    @IsNumber({}, {message: 'A dosagem deve ser um numero'})
    dosagemQtd!: number

}

export class DeleteUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID da insulina'})
    @IsString({ message: 'O ID deve ser uma string'})
    id!: string

    @ApiProperty({example: '1', description: 'ID do usuário'})
    @IsString({message: 'O ID do usuário deve ser uma string'})
    userId!: string
}