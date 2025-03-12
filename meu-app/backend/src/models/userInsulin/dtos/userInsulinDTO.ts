import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, isString } from 'class-validator';

export class CreateUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do usuario' })
    @IsNumber( {}, {message: 'O ID do usuario deve ser number.' })
    userID!: number

    @ApiProperty({example: 'Insulina', description: 'Nome da insulina'})
    @IsString({ message: 'O nome da insulina deve ser uma string' })
    @IsNotEmpty()
    Insulina!: string

    @ApiProperty({example: 'Dosagem', description: 'dosagem da insulina'})
    @IsNumber({}, {message: 'A dosagem deve ser um numero'})
    @IsNotEmpty()
    dosagem!: number
}

export class GetUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuario'})
    @IsNumber({}, {message: 'O ID deve ser um numero'})
    userId!: number
}

export class PatchUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuário'})
    @IsNumber({}, {message: 'O ID deve ser um numero'})
    UserId!: number
}

export class DeleteUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuário'})
    @IsNumber({}, {message: 'O ID deve ser um numero'})
    userId!: number
}