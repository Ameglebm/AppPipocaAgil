import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from '../dtos/lojaDto';
import { CreateLojaService } from './createLojaService';
import { FindAllLojaService } from './findAllLojaService';
import { FindByIdService } from './findByIdLojaService';
import { FindByUfService } from './findByUfService';
import { findByCepServiceService } from './findByCep/findByCepService';
import { ServicoDeLogger } from '../../utils/logger/logger';

@Injectable()
export class LojaService {
    constructor(
        private readonly createLojaService: CreateLojaService,
        private readonly findAllService: FindAllLojaService,
        private readonly findByIdService: FindByIdService,
        private readonly findByUfService: FindByUfService,
        private readonly buscarLojaPorCepService: findByCepServiceService,
        private readonly logger: ServicoDeLogger
    ) {}

    // Criar a loja
    async create(createLojaDto: CreateLojaDto) {
        this.logger.log(
            'Iniciando a criação da loja com os dados: ' +
                JSON.stringify(createLojaDto)
        );
        try {
            const loja = await this.createLojaService.create(createLojaDto);
            this.logger.log('Loja criada com sucesso: ' + JSON.stringify(loja));
            return loja;
        } catch (erro) {
            this.logger.error('Erro ao criar loja', erro);
            throw erro;
        }
    }

    // Listar todas
    async findAll(limit: number = 1, offset: number = 0) {
        this.logger.log(
            `Listando lojas com limite: ${limit} e offset: ${offset}`
        );
        try {
            const resultado = await this.findAllService.findAll(limit, offset);
            this.logger.log(
                'Lojas listadas com sucesso: ' + JSON.stringify(resultado)
            );
            return resultado;
        } catch (erro) {
            this.logger.error('Erro ao listar lojas', erro);
            throw erro;
        }
    }

    // Listar por ID
    async findById(id: string) {
        this.logger.log(`Buscando loja pelo ID: ${id}`);
        try {
            const loja = await this.findByIdService.findById(id);
            this.logger.log('Loja encontrada: ' + JSON.stringify(loja));
            return loja;
        } catch (erro) {
            this.logger.error(`Erro ao buscar loja com ID: ${id}`, erro);
            throw erro;
        }
    }

    // Listar por UF
    async findByUf(uf: string, limit: number = 1, offset: number = 0) {
        this.logger.log(
            `Buscando lojas por UF: ${uf} com limite: ${limit} e offset: ${offset}`
        );
        try {
            const resultado = await this.findByUfService.findByUf(
                uf,
                limit,
                offset
            );
            this.logger.log(
                'Lojas encontradas por UF: ' + JSON.stringify(resultado)
            );
            return resultado;
        } catch (erro) {
            this.logger.error(`Erro ao buscar lojas por UF: ${uf}`, erro);
            throw erro;
        }
    }

    // Buscar por CEP
    async findByCep(cep: string, limit: number = 20, offset: number = 0) {
        this.logger.log(
            `Buscando lojas pelo CEP: ${cep} com limite: ${limit} e offset: ${offset}`
        );
        try {
            const resultado = await this.buscarLojaPorCepService.findByCep(
                cep,
                limit,
                offset
            );
            this.logger.log(
                'Lojas encontradas pelo CEP: ' + JSON.stringify(resultado)
            );
            return resultado;
        } catch (erro) {
            this.logger.error(`Erro ao buscar lojas pelo CEP: ${cep}`, erro);
            throw erro;
        }
    }
}
