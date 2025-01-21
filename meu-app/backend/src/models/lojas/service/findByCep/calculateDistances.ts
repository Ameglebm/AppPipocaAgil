import { getDistance } from 'geolib';
import { LojaDocument } from '../../schema/lojaSchema';
import { ServicoDeLogger } from '../../../utils/logger/logger';

export function calculateDistances(
    lojasData: LojaDocument[],
    coordenadas: any,
    logger: ServicoDeLogger
) {
    return lojasData.map((loja: LojaDocument) => {
        const lojaLatitude = parseFloat(loja.latitude);
        const lojaLongitude = parseFloat(loja.longitude);

        if (isNaN(lojaLatitude) || isNaN(lojaLongitude)) {
            logger.error(
                `Coordenadas inválidas para a loja ${loja.storeName}: Latitude ${loja.latitude}, Longitude ${loja.longitude}`
            );
            return {
                ...loja.toObject(),
                distanciaKm: null,
            };
        }

        const distanceInMeters = getDistance(
            {
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
            },
            { latitude: lojaLatitude, longitude: lojaLongitude }
        );

        logger.log(
            `Distância calculada para a loja ${loja.storeName}: ${
                distanceInMeters / 1000
            } km`
        );

        return {
            ...loja.toObject(),
            distanciaKm: distanceInMeters / 1000,
        };
    });
}
