import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    BadRequestException,
    Res,
} from '@nestjs/common';
import { CreateLojaDto } from '../dtos/lojaDto';
import { LojaService } from '../service/lojaService';
import { LojaDocument } from '../schema/lojaSchema';
import { IsValidState } from '../../validators/estadoValidator';
import { ValidationArguments } from 'class-validator';
import { IsValidCep } from '../../validators/cepValidator';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('lojas')
@ApiTags('meowble')
export class LojaController {
    constructor(
        private readonly lojaService: LojaService,
        private readonly IsValidState: IsValidState,
        private readonly IsValidCep: IsValidCep
    ) {}

    @Post()
    @ApiOperation({ summary: 'Criação de loja' })
    @ApiResponse({ status: 201, description: 'Loja criada com sucesso!' })
    @ApiResponse({
        status: 400,
        description: 'Erro ao criar loja, parâmetro inválido.',
    })
    async create(
        @Body() createLojaDto: CreateLojaDto,
        @Res() res: Response
    ): Promise<Response> {
        try {
            console.log('Criando loja com os dados:', createLojaDto);
            const loja = await this.lojaService.create(createLojaDto);
            console.log('Loja criada com sucesso:', loja);
            return res.status(201).json(loja);
        } catch (error) {
            console.error('Erro ao criar loja:', error);
            return res.status(500).json({ mensagem: 'Erro ao criar loja' });
        }
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as lojas' })
    @ApiResponse({ status: 200, description: 'Lojas listadas com sucesso!' })
    @ApiResponse({
        status: 404,
        description: 'Erro ao buscar lojas.',
    })
    async listAll(@Res() res: Response) {
        try {
            console.log('Listando todas as lojas...');
            const resultado = await this.lojaService.findAll();
            console.log('Lojas listadas com sucesso:', resultado);
            return res.status(200).json({
                stores: resultado.stores,
                total: resultado.total,
                mensagem: resultado.mensagem || '',
            });
        } catch (error) {
            console.error('Erro ao listar lojas:', error);
            return res.status(500).json({ mensagem: 'Erro ao listar lojas' });
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Listar loja por ID' })
    @ApiResponse({ status: 200, description: 'Loja listada com sucesso!' })
    @ApiResponse({
        status: 404,
        description: 'Erro ao buscar loja por ID.',
    })
    async findById(@Param('id') id: string, @Res() res: Response) {
        try {
            console.log(`Buscando loja pelo ID: ${id}`);
            const resultado = await this.lojaService.findById(id);
            console.log('Loja encontrada:', resultado);
            return res.status(200).json({
                stores: resultado.stores,
                total: resultado.total,
                mensagem: resultado.mensagem || '',
            });
        } catch (error) {
            console.error('Erro ao buscar loja por ID:', error);
            return res
                .status(500)
                .json({ mensagem: 'Erro ao buscar loja por ID' });
        }
    }

    @Get('uf/:state')
    @ApiOperation({ summary: 'Listar lojas no estado.' })
    @ApiResponse({ status: 200, description: 'Lojas listadas com sucesso!' })
    @ApiResponse({
        status: 404,
        description: 'Erro ao buscar lojas por UF.',
    })
    async findByUf(
        @Param('state') state: string,
        @Query('limit') limit: number = 1,
        @Query('offset') offset: number = 0,
        @Res() res: Response
    ) {
        try {
            console.log(`Buscando lojas pelo estado: ${state}`);
            if (!this.IsValidState.validate(state, {} as ValidationArguments)) {
                console.log('Estado inválido:', state);
                throw new BadRequestException('O estado informado é inválido.');
            }

            const resultado = await this.lojaService.findByUf(
                state,
                limit,
                offset
            );
            console.log('Lojas encontradas pelo estado:', resultado);
            return res.status(200).json({
                stores: resultado.stores,
                limit: resultado.limit,
                offset: resultado.offset,
                total: resultado.total,
                mensagem: resultado.mensagem || '',
            });
        } catch (error) {
            console.error('Erro ao buscar lojas por UF:', error);
            return res
                .status(500)
                .json({ mensagem: 'Erro ao buscar lojas por UF' });
        }
    }

    @Get('/buscarProx/:cep')
    @ApiResponse({ status: 200, description: 'Lojas listadas com sucesso!' })
    @ApiResponse({
        status: 400,
        description: 'Erro ao buscar loja por UF.',
    })
    @ApiOperation({
        summary:
            'Listar lojas próximas em 50km e calcular delivery e tempo de entrega, listar lojas mais distantes que 50km e calcular frete (PAC | SEDEX) e tempo de entrega',
    })
    async findByCep(
        @Param('cep') cep: string,
        @Query('limit') limit: number = 20,
        @Query('offset') offset: number = 0,
        @Res() res: Response
    ) {
        try {
            console.log(`Buscando lojas pelo CEP: ${cep}`);
            if (
                !(await this.IsValidCep.validate(
                    cep,
                    {} as ValidationArguments
                ))
            ) {
                console.log('CEP inválido:', cep);
                throw new BadRequestException('O CEP informado é inválido.');
            }
            const resultado = await this.lojaService.findByCep(
                cep,
                limit,
                offset
            );
            console.log('Lojas encontradas pelo CEP:', resultado);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao buscar lojas por CEP:', error);
            const errorDetails =
                error instanceof Error
                    ? { mensagem: error.message, stack: error.stack }
                    : { mensagem: 'Erro desconhecido', detalhes: error };
            return res.status(500).json({
                mensagem: 'Erro ao buscar lojas por CEP.',
                detalhes: errorDetails,
            });
        }
    }
}
