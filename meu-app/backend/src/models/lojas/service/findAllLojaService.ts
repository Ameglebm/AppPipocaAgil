import { Injectable } from '@nestjs/common';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';
import { LojaDocument } from '../schema/lojaSchema';
import { LojaRetorno } from '../interface/LojaRetornoInterface';

@Injectable()
export class FindAllLojaService {
    constructor(
        private readonly lojaRepository: LojaRepository,
        private readonly logger: ServicoDeLogger
    ) {}

    async findAll(limit: number = 1, offset: number = 0): Promise<LojaRetorno> {
        try {
            if (!this.lojaRepository) {
                throw new Error('LojaRepository não está definido');
            }

            this.logger.log(
                `Buscando todas as lojas com limite: ${limit} e offset: ${offset}...`
            );

            const lojas = await this.lojaRepository.findAll(limit, offset);
            const total = await this.lojaRepository.count();

            if (lojas.length === 0) {
                const mensagem = 'Nenhuma loja encontrada.';
                this.logger.warn(mensagem);
                return { stores: [], limit, offset, total, mensagem };
            }

            const lojasFiltradas = lojas.map((loja: LojaDocument) => {
                const { tempoDePreparo, disponivelNoEstoque, ...resto } =
                    loja.toObject();
                return resto;
            });

            this.logger.log(
                `Lojas listadas com sucesso. Total de lojas: ${total}`
            );
            return { stores: lojasFiltradas, limit, offset, total };
        } catch (error) {
            this.logger.error('Erro ao listar as lojas:', error);
            throw error;
        }
    }
}
