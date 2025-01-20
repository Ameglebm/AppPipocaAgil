import { HereMapsServiceDelivery } from '../../../hereMaps/calculoDelivery/service/hereMapsDeliveryService';
import { GetDeliveryCustoDto } from '../../../hereMaps/calculoDelivery/dto/hereMapsCustoDeliveryDtos';
import { ServicoDeLogger } from '../../../utils/logger/logger';

export async function getDeliveryCost(
    lojaLatitude: number,
    lojaLongitude: number,
    latDestino: number,
    longDestino: number,
    distanciaKm: number,
    hereMapsServiceDelivery: HereMapsServiceDelivery,
    logger: ServicoDeLogger
) {
    const deliveryDto: GetDeliveryCustoDto = {
        origemLatitude: lojaLatitude,
        origemLongitude: lojaLongitude,
        destinoLatitude: latDestino,
        destinoLongitude: longDestino,
        distanciaKm,
    };

    try {
        const deliveryCost = await hereMapsServiceDelivery.getDeliveryCost(
            deliveryDto
        );
        logger.log('Cálculo do custo de delivery concluído com sucesso.');
        return deliveryCost;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Erro desconhecido';
        logger.error(
            `Falha ao calcular o custo de delivery: ${errorMessage}`,
            error
        );
        throw error;
    }
}
