import { LojaComDistancia } from '../../interface/lojaComDistanciaInterface';
import { ServicoDeLogger } from '../../../utils/logger/logger';

export function categorizeStores(
    lojasMenor50Km: LojaComDistancia[],
    logger: ServicoDeLogger
) {
    logger.log(
        `Iniciando categorização das lojas. Total de lojas recebidas: ${lojasMenor50Km.length}`
    );

    const tiposDeLojasMenor50Km = lojasMenor50Km.reduce<{
        [key: string]: LojaComDistancia[];
    }>(
        (acc, loja) => {
            if (loja && loja.type) {
                const type = loja.type;
                logger.log(`Categorizando loja ${loja.id} como tipo: ${type}`);

                if (type === 'PDV') {
                    if (!acc['pdvs']) acc['pdvs'] = [];
                    acc['pdvs'].push(loja);
                } else if (type === 'LOJA') {
                    if (!acc['lojas']) acc['lojas'] = [];
                    acc['lojas'].push(loja);
                } else {
                    logger.warn(
                        `Tipo de loja desconhecido encontrado: ${type} para loja ${loja.id}`
                    );
                }
            } else {
                logger.warn(
                    `Loja sem tipo válido encontrada. Dados: ${JSON.stringify(
                        loja
                    )}`
                );
            }
            return acc;
        },
        { pdvs: [], lojas: [] }
    );

    logger.log(
        `Categorização concluída. Lojas PDV: ${tiposDeLojasMenor50Km.pdvs.length}, Lojas: ${tiposDeLojasMenor50Km.lojas.length}`
    );

    return tiposDeLojasMenor50Km;
}
