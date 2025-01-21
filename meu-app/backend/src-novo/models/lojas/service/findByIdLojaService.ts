import { Injectable } from '@nestjs/common';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';
import { LojaRetorno } from '../interface/LojaRetornoInterface';

@Injectable()
export class FindByIdService {
    constructor(
        private readonly lojaRepository: LojaRepository,
        private readonly logger: ServicoDeLogger
    ) {}

    async findById(id: string): Promise<LojaRetorno> {
        try {
            this.logger.log(`Buscando loja pelo ID: ${id}...`);

            const loja = await this.lojaRepository.findById(id);
            if (!loja) {
                const mensagem = `Loja com ID ${id} não encontrada.`;
                this.logger.warn(mensagem);
                return { stores: [], limit: 1, offset: 0, total: 0, mensagem };
            }

            const {
                _id,
                latitude,
                longitude,
                tempoDePreparo,
                disponivelNoEstoque,
                ...resto
            } = loja.toObject();
            this.logger.log(`Loja com ID ${id} encontrada com sucesso.`);

            return { stores: [resto], limit: 1, offset: 0, total: 1 };
        } catch (error) {
            this.logger.error(`Erro ao buscar loja com ID ${id}:`, error);
            throw error;
        }
    }
}
