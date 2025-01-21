import { Injectable } from '@nestjs/common';
import { LojaRepository } from '../../repo/lojaRepo';
import { ServicoDeLogger } from '../../../utils/logger/logger';
import { HereMapsService } from '../../../hereMaps/buscarLatLong/service/hereMapsService';
import { getCoordinates } from './getCoordinates';
import { calculateDistances } from './calculateDistances';
import { filterStores } from './filterStore';
import { categorizeStores } from './categorizeLoja';
import { CorreiosService } from '../../../correios/correiosService';
import { HereMapsServiceDelivery } from '../../../hereMaps/calculoDelivery/service/hereMapsDeliveryService';
import { error } from 'console';

@Injectable()
export class findByCepServiceService {
    constructor(
        private readonly lojaRepository: LojaRepository,
        private readonly logger: ServicoDeLogger,
        private readonly hereMapsService: HereMapsService,
        private readonly correiosService: CorreiosService,
        private readonly hereMapsServiceDelivery: HereMapsServiceDelivery
    ) {}

    async findByCep(cep: string, limit: number = 20, offset: number = 0) {
        this.logger.log(`Iniciando busca de lojas para o CEP: ${cep}`);
        try {
            // Coordenadas (getCoordinates.ts)
            const coordenadas = await getCoordinates(
                this.hereMapsService,
                cep,
                this.logger
            );
            if (
                !coordenadas ||
                !coordenadas.latitude ||
                !coordenadas.longitude
            ) {
                this.logger.error(
                    `Falha ao obter coordenadas para o CEP: ${cep}`,
                    error
                );
                throw new Error('Falha ao obter coordenadas.');
            }
            this.logger.log(
                `Coordenadas obtidas com sucesso para o CEP: ${cep}`
            );

            // Listar todas as lojas (lojaRepo.ts / uso do findAll)
            const lojasData = await this.lojaRepository.findAll(limit, offset);
            if (!lojasData || lojasData.length === 0) {
                this.logger.error(
                    'Nenhuma loja encontrada no banco de dados.',
                    error
                );
                throw new Error('Nenhuma loja encontrada.');
            }
            this.logger.log(
                `Lojas obtidas com sucesso. Total de lojas: ${lojasData.length}`
            );

            const totalLojas = await this.lojaRepository.count();
            this.logger.log(`Total de lojas no banco de dados: ${totalLojas}`);

            // Calcular distâncias (calculateDistances.ts)
            const lojasComDistancia = calculateDistances(
                lojasData,
                coordenadas,
                this.logger
            );
            if (!lojasComDistancia || lojasComDistancia.length === 0) {
                this.logger.error(
                    'Falha ao calcular distâncias para as lojas.',
                    error
                );
                throw new Error('Erro ao calcular distâncias.');
            }
            this.logger.log(
                'Cálculo de distâncias das lojas realizado com sucesso.'
            );

            // Filtrar lojas por distância e calcular frete e delivery (filterStores.ts)
            const { lojasMenor50Km, lojasMaiorIgual50Km } = await filterStores(
                lojasComDistancia,
                50,
                this.correiosService,
                this.logger,
                cep,
                coordenadas.latitude.toString(),
                coordenadas.longitude.toString(),
                this.hereMapsServiceDelivery
            );

            if (!lojasMenor50Km) {
                this.logger.error(
                    'Erro ao filtrar lojas a menos de 50 km do CEP fornecido. (lojasMenor50Km)',
                    error
                );
            }
            if (!lojasMaiorIgual50Km) {
                this.logger.error(
                    'Erro ao filtrar lojas a 50 km ou mais do CEP fornecido. (lojasMaiorIgual50Km)',
                    error
                );
            }
            this.logger.log('Filtragem de lojas concluída com sucesso.');

            // Categorizar lojas (categorizeStores.ts)
            const tiposDeLojasMenor50Km = categorizeStores(
                lojasMenor50Km,
                this.logger
            );

            const response = {
                stores: {
                    menor50Km: tiposDeLojasMenor50Km,
                    maiorIgual50Km: lojasMaiorIgual50Km,
                },
                limit,
                offset,
                total: totalLojas,
            };

            this.logger.log('Busca de lojas por CEP concluída com sucesso.');
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(
                    `Erro ao buscar lojas para o CEP: ${cep}. Erro: ${error.message}`,
                    error
                );
                return {
                    mensagem: 'Erro ao buscar lojas por CEP.',
                    detalhes: {
                        mensagem: error.message,
                        stack: error.stack,
                    },
                };
            } else {
                this.logger.error(
                    `Erro desconhecido ao buscar lojas para o CEP: ${cep}.`,
                    error
                );
                return {
                    mensagem: 'Erro desconhecido ao buscar lojas por CEP.',
                    detalhes: {
                        mensagem: 'Erro desconhecido.',
                        stack: null,
                    },
                };
            }
        }
    }
}
