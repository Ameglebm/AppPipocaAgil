import { AuthGuard } from '@/middlewares/auth.guard';
import { Controller, Post, Get, Patch, Delete, UseGuards, Inject, Body, InternalServerErrorException, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserInsulinService } from '../interface/userInsulinService.interface';
import { CreateUserInsulinDTO, DeleteUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO } from '../dtos/userInsulinDTO';

@UseGuards(AuthGuard)
@ApiTags('userInsulin')
@Controller('userInsulin')

export class UserinsulinController { 
    constructor (@Inject('IUserInsulinService') private readonly userInsulinService: IUserInsulinService) {} 

    // link ajustado para vazio 
    // FINALIZADO
    @ApiOperation({ summary: 'Registrar administração de insulina'})
    @ApiResponse({ status: 201, description: 'Administração de insulina registrada com sucesso'})
    @ApiResponse({ status: 400, description: 'Erro de validação'})
    @ApiResponse({ status: 500, description: 'Erro interno no servidor'})
    @Post()
    async createUserInsulin(@Body() insulinDto: CreateUserInsulinDTO): Promise<void> {
        try {
            await this.userInsulinService.createUserInsulin(insulinDto);
        } catch (error) {
            console.error('Erro ao registrar administração de insulina:', error);
            throw new InternalServerErrorException('Erro interno no servidor');
        }
    }

    /* Link deve ser apenas :userId. Está faltando o try do try catch. Corrigir DTO para receber apenas o id.
    No service deve converter o id que é uma string para um number e salvar na variável userId para buscar no repository 
    Revisar texto do error.message para ser igual ao do service */
    // feito todos os ajustes FINALIZADO
    @ApiOperation({ summary: 'Ober registro de insulina'})
    @ApiResponse({ status: 200, description: 'Registro de insulina encontrado'})
    @ApiResponse({ status: 400, description: 'Erro de validação' })
    @ApiResponse({ status: 404, description: 'Registro de insulina não encontrado'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @Get(':userid')
    async getUserInsulin(@Param() params: GetUserInsulinDTO) {
        try {
            const data = await this.userInsulinService.getUserInsulin(params);
            return { data };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            console.error('Erro ao obter registro de insulina', error);
            throw new InternalServerErrorException('Erro interno do servidor');
        }
    }
    
    /* PATCH deve usar BODY ao invés de PARAM. Deixar LINK em branco. 
    Ajustar tratamento do erro, tanto no controller, como no service / repository 
    Remover o record e chamar direto o await. Não deve retornar nada */ 
    //FINALIZADO
    @ApiOperation({ summary: 'Atualizar registro de insulina'})
    @ApiResponse({ status: 200, description: 'Registro de insulina atualizado com sucesso'})
    @ApiResponse({ status: 400, description: 'Erro de validação'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @Patch()
        async patchUserInsulin(@Body() params: PatchUserInsulinDTO) {
            try {
                const data = await this.userInsulinService.patchUserInsulin(params);
                return { data: data };
            } catch (error) {
                if (error instanceof NotFoundException) {
                    throw error;
                }

                console.error('Erro ao atualizar registro de insulina:', error);
                throw new InternalServerErrorException('Erro interno do servidor');
            }
        }

        /* Link deve ser :userId/:id
        Remover o record e chamar direto o await. Não deve retornar nada 
        O service / repository não tem nenhum throw error, então o catch error do controller não está fazendo nada */
        // FINALIZADO
         @ApiOperation({ summary: 'Deletar registro de insulina'})
         @ApiResponse({ status: 200, description: 'Registro de insulina deletado com sucesso'})
         @ApiResponse({ status: 400, description: 'Erro de validação'})
         @ApiResponse({ status: 404, description: 'Registro de insulina não encontrado'})
         @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
         @Delete(':userId/:id')
         async deleteUserInsulin(@Param() params: DeleteUserInsulinDTO){
            try {
                const record = await this.userInsulinService.deleteUserInsulin(params)

                return {data: record}

            } catch (error) {
                if (error instanceof Error && error.message === 'Registro de insulina não encontrado') {
                    throw new NotFoundException(error.message)
                }

                console.error('Erro ao deletar registro de insulina', error)
                throw new InternalServerErrorException (
                    'Erro interno do servidor')
            }
         }
    }
    


