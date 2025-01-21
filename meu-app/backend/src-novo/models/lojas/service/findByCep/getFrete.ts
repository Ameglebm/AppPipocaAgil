import { CorreiosService } from '../../../correios/correiosService';
import { CorreiosDto } from '../../../correios/correiosDTO';
import { ServicoDeLogger } from '../../../utils/logger/logger';
import { formatCep } from './formatCep';

export async function getFrete(
    lojaCodigoPostal: string,
    cepDestino: string,
    correiosService: CorreiosService,
    logger: ServicoDeLogger
) {
    const correiosDto: CorreiosDto = {
        servico: '04014',
        cepOrigem: formatCep(lojaCodigoPostal),
        cepDestino: formatCep(cepDestino),
        Peso: '1',
        Formato: '1',
        Comprimento: '20',
        Altura: '10',
        Largura: '15',
        Diametro: '0',
        MaoPropria: 'N',
        ValorDeclarado: '0',
        AvisoRecebimento: 'N',
    };

    try {
        const frete = await correiosService.obterPrecosEPrazos(correiosDto);
        logger.log('Frete calculado com sucesso.');
        return frete;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Erro desconhecido';
        logger.error(`Falha ao calcular o frete: ${errorMessage}`, error);
        throw error;
    }
}
