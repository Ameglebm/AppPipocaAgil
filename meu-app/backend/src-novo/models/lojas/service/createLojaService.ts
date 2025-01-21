import { LojaDocument } from '../schema/lojaSchema';
import { CreateLojaDto } from '../dtos/lojaDto';
import { ServicoDeLogger } from '../../utils/logger/logger';
import { LojaRepository } from '../repo/lojaRepo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateLojaService {
    constructor(
        private readonly lojaRepository: LojaRepository,
        private readonly logger: ServicoDeLogger
    ) {}

    async create(createLojaDto: CreateLojaDto): Promise<LojaDocument> {
        this.logger.log('Recebendo dados para criação da loja...');

        try {
            const resultado = await this.lojaRepository.create(createLojaDto);
            this.logger.log('Loja criada com sucesso!');
            return resultado;
        } catch (error) {
            this.logger.error('Erro ao tentar criar a loja:', error);
            throw new Error(
                'Falha na criação da loja. Por favor, tente novamente.'
            );
        }
    }
}
