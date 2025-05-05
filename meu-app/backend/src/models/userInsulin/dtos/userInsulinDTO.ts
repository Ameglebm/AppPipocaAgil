import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, } from 'class-validator';

export class CreateUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do usuário.' })
    @IsNumber( {}, {message: 'O ID do usuário deve ser number.' })
    userId!: number

    @ApiProperty({example: 'Insulina', description: 'Nome da insulina.'})
    @IsString({ message: 'O nome da insulina deve ser uma string.' })
    @IsNotEmpty()
    insulina!: string

    @ApiProperty({example: 'Dosagem', description: 'Dosagem da insulina.'})
    @IsNumber({}, {message: 'A dosagem deve ser um número.'})
    @IsNotEmpty()
    dosagemQtd!: number
}

// Ajustado para uma string
export class GetUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuário.'})
    @IsString({ message: 'O ID do usuário deve ser uma string.'})
    userId!: string
}

export class PatchUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do registro.'})
    @IsNumber({}, {message: 'O ID do registro deve ser um número.'}) 
    id!: number

    @ApiProperty({ example: 'Dosagem', description: 'Dosagem da insulina.'})
    @IsNumber({}, {message: 'A dosagem deve ser um número.'})
    dosagemQtd!: number

    @ApiProperty({ example: '1', description: 'ID do usuário.'})
    @IsString({message: 'O ID do usuario deve ser uma string.'}) 
    @IsOptional()
    userId!: string

    @ApiProperty({ example: 'Insulina', description: 'Nome da insulina.'})
    @IsString({ message: 'O nome da insulina deve ser uma string.' })
    @IsOptional()
    insulina!: string

}

export class DeleteUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID da insulina.'})
    @IsNumber({},{ message: 'O ID deve ser uma string.'})
    id!: number
}

export class DeleteInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID da insulina.'})
    @IsNumber({},{ message: 'O ID deve ser uma string.'})
    id!: number

    @ApiProperty({example: '1', description: 'ID do usuário.'})
    @IsString({message: 'O ID do usuário deve ser uma string.'})
    userId!: string
}