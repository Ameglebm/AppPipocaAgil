import { HereMapsService } from '../../../hereMaps/buscarLatLong/service/hereMapsService';
import { ServicoDeLogger } from '../../../utils/logger/logger';

export async function getCoordinates(
    hereMapsService: HereMapsService,
    cep: string,
    logger: ServicoDeLogger
) {
    const coordenadas = await hereMapsService.getCoordinates(cep);
    if (!coordenadas || !coordenadas.latitude || !coordenadas.longitude) {
        throw new Error('Não foi possível obter as coordenadas do CEP.');
    }
    // logger.log(
    //     `Coordenadas do CEP: Latitude ${coordenadas.latitude}, Longitude ${coordenadas.longitude}`
    // );
    return coordenadas;
}
