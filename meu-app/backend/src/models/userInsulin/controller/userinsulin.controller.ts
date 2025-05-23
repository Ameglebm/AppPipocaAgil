import { AuthGuard } from '@/middlewares/auth.guard';
import { Controller, Post, Get, Patch, Delete, UseGuards, Inject, Body, InternalServerErrorException, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserInsulinService } from '../interface/userInsulinService.interface';
import { CreateUserInsulinDTO, DeleteUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO } from '../dtos/userInsulinDTO';

@UseGuards(AuthGuard)
@ApiTags('insulin')
@Controller('insulin')

export class UserinsulinController { 
    constructor (@Inject('IUserInsulinService') private readonly userInsulinService: IUserInsulinService) {} 

    @ApiOperation({ summary: 'Registrar administração de insulina.'})
    @ApiResponse({ status: 201, description: 'Administração de insulina registrada com sucesso.'})
    @ApiResponse({ status: 400, description: 'Erro de validação.'})
    @ApiResponse({ status: 500, description: 'Erro interno no servidor.'})
    @Post('register')
    async createUserInsulin(@Body() insulinDto: CreateUserInsulinDTO): Promise<void> {
        try {
            await this.userInsulinService.createUserInsulin(insulinDto);
        } catch (error) {
            console.error('Erro ao registrar administração de insulina:', error);
            throw new InternalServerErrorException('Erro interno no servidor.');
        }
    }

    @ApiOperation({ summary: 'Ober registro de insulina.'})
    @ApiResponse({ status: 200, description: 'Registro de insulina encontrado.'})
    @ApiResponse({ status: 400, description: 'Erro de validação.' })
    @ApiResponse({ status: 404, description: 'Registro de insulina não encontrado.'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.'})
    @Get('user/:userId')
    async getUserInsulin(@Param() params: GetUserInsulinDTO) {
        try {
            return await this.userInsulinService.getUserInsulin(params);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            console.error('Erro ao obter registro de insulina:', error);
            throw new InternalServerErrorException('Erro interno do servidor.');
        }
    }
    
    @ApiOperation({ summary: 'Atualizar registro de insulina.'})
    @ApiResponse({ status: 200, description: 'Registro de insulina atualizado com sucesso.'})
    @ApiResponse({ status: 400, description: 'Erro de validação.'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.'})
    @Patch('/user/:userId')
        async patchUserInsulin(@Body() patchUserInsulin: PatchUserInsulinDTO, @Param('userId') userId: string) {
            try {
                const data = {
                    id: patchUserInsulin.id,
                    userId: userId,
                    dosagemQtd: patchUserInsulin.dosagemQtd,
                    insulina: patchUserInsulin.insulina,
                }
                await this.userInsulinService.patchUserInsulin(data);
            } catch (error) {
                if (error instanceof NotFoundException) {
                    throw error;
                }

                console.error('Erro ao atualizar registro de insulina:', error);
                throw new InternalServerErrorException('Erro interno do servidor.');
            }
        }

         @ApiOperation({ summary: 'Deletar registro de insulina.'})
         @ApiResponse({ status: 200, description: 'Registro de insulina deletado com sucesso.'})
         @ApiResponse({ status: 400, description: 'Erro de validação.'})
         @ApiResponse({ status: 404, description: 'Registro de insulina não encontrado.'})
         @ApiResponse({ status: 500, description: 'Erro interno do servidor.'})
         @Delete('/user/:userId')
         async deleteUserInsulin(@Body() params: DeleteUserInsulinDTO, @Param('userId') userId: string){
            try {
                await this.userInsulinService.deleteUserInsulin({ ...params, userId})
            } catch (error) {
                if (error instanceof Error && error.message === 'Registro de insulina não encontrado.') {
                    throw new NotFoundException(error.message)
                }

                console.error('Erro ao deletar registro de insulina:', error)
                throw new InternalServerErrorException (
                    'Erro interno do servidor.')
            }
         }
    }