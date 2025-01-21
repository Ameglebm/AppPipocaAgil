import { Injectable } from '@nestjs/common';
import { LojaDocument } from '../schema/lojaSchema';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';
import { LojaRetorno } from '../interface/LojaRetornoInterface';

@Injectable()
export class FindByUfService {
    constructor(
        private readonly lojaRepository: LojaRepository,
        private readonly logger: ServicoDeLogger
    ) {}

    async findByUf(
        state: string,
        limit: number = 1,
        offset: number = 0
    ): Promise<LojaRetorno> {
        try {
            this.logger.log(`Buscando lojas na UF ${state}...`);

            const lojas = await this.lojaRepository.findByUf(
                state,
                limit,
                offset
            );
            const total = await this.lojaRepository.countByUf(state);

            if (lojas.length === 0) {
                const mensagem = `Nenhuma loja encontrada na UF ${state}.`;
                this.logger.warn(mensagem);
                return { stores: [], limit, offset, total, mensagem };
            }

            const lojasFiltradas = lojas.map((loja: LojaDocument) => {
                const {
                    latitude,
                    longitude,
                    tempoDePreparo,
                    disponivelNoEstoque,
                    ...resto
                } = loja.toObject();
                return resto;
            });

            this.logger.log(
                `Lojas na UF ${state} encontradas: ${lojas.length}`
            );
            return { stores: lojasFiltradas, limit, offset, total };
        } catch (error) {
            this.logger.error(`Erro ao buscar lojas na UF ${state}:`, error);
            throw error;
        }
    }
}
