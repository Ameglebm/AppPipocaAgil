import { LojaComDistancia } from '../../interface/lojaComDistanciaInterface';
import { CorreiosService } from '../../../correios/correiosService';
import { ServicoDeLogger } from '../../../utils/logger/logger';
import { HereMapsServiceDelivery } from '../../../hereMaps/calculoDelivery/service/hereMapsDeliveryService';
import formatStoreData from './formatStore';
import { getDeliveryCost } from './getDeliveryCost';
import { getFrete } from './getFrete';

export async function filterStores(
    lojas: LojaComDistancia[],
    distanceLimit: number,
    correiosService: CorreiosService,
    logger: ServicoDeLogger,
    cepDestino: string,
    latDestino: string,
    longDestino: string,
    hereMapsServiceDelivery: HereMapsServiceDelivery
) {
    const lojasMenor50Km: any[] = [];
    const lojasMaiorIgual50Km: any[] = [];

    // Categorizar e filtrar as lojas antes de calcular delivery/frete
    const lojasFiltradas = lojas.filter(
        (loja) => loja.distanciaKm != null && !isNaN(loja.distanciaKm)
    );

    for (const loja of lojasFiltradas) {
        if (
            loja.distanciaKm != null &&
            parseFloat(loja.distanciaKm.toString()) < distanceLimit
        ) {
            // Calcular delivery para lojas < 50km (todos os tipos)
            try {
                logger.log(
                    `Calculando custo de delivery para loja ${loja.id} (${loja.storeName})...`
                );
                const deliveryCost = await getDeliveryCost(
                    parseFloat(loja.latitude),
                    parseFloat(loja.longitude),
                    parseFloat(latDestino),
                    parseFloat(longDestino),
                    loja.distanciaKm!,
                    hereMapsServiceDelivery,
                    logger
                );
                lojasMenor50Km.push(
                    formatStoreData(
                        loja,
                        [],
                        loja.distanciaKm!,
                        loja.shippingTimeInDays,
                        deliveryCost
                    )
                );
                logger.log(
                    `Custo de delivery calculado com sucesso para a loja ${loja.id} (${loja.storeName}).`
                );
            } catch (error) {
                logger.error(
                    `Erro ao calcular custo de delivery para loja ${loja.id} (${
                        loja.storeName
                    }). Erro: ${
                        error instanceof Error
                            ? error.message
                            : 'Erro desconhecido'
                    }`,
                    error
                );
            }
        } else if (loja.type === 'LOJA') {
            try {
                logger.log(
                    `Calculando frete para loja ${loja.id} (${loja.storeName})...`
                );
                const frete = await getFrete(
                    loja.postalCode,
                    cepDestino,
                    correiosService,
                    logger
                );
                loja.frete = frete;
                lojasMaiorIgual50Km.push(
                    formatStoreData(
                        loja,
                        frete,
                        loja.distanciaKm!,
                        loja.shippingTimeInDays
                    )
                );
                logger.log(
                    `Frete calculado com sucesso para a loja ${loja.id} (${loja.storeName}).`
                );
            } catch (error) {
                logger.error(
                    `Erro ao calcular frete para loja ${loja.id} (${
                        loja.storeName
                    }). Erro: ${
                        error instanceof Error
                            ? error.message
                            : 'Erro desconhecido'
                    }`,
                    error
                );
            }
        }
    }

    // Ordenar por distância
    lojasMenor50Km.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );
    lojasMaiorIgual50Km.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );

    logger.log('Filtro de lojas concluído com sucesso.');

    return { lojasMenor50Km, lojasMaiorIgual50Km };
}
