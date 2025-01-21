import { Test, TestingModule } from '@nestjs/testing';
import { findByCepServiceService } from '../service/findByCep/findByCepService';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';
import { HereMapsService } from '../../hereMaps/buscarLatLong/service/hereMapsService';
import { CorreiosService } from '../../correios/correiosService';
import { HereMapsServiceDelivery } from '../../hereMaps/calculoDelivery/service/hereMapsDeliveryService';
import { getCoordinates } from '../service/findByCep/getCoordinates';
import { calculateDistances } from '../service/findByCep/calculateDistances';
import { filterStores } from '../service/findByCep/filterStore';
import { categorizeStores } from '../service/findByCep/categorizeLoja';

jest.mock('../service/findByCep/getCoordinates');
jest.mock('../service/findByCep/calculateDistances');
jest.mock('../service/findByCep/filterStore');
jest.mock('../service/findByCep/categorizeLoja');

describe('findByCepServiceService', () => {
    let service: findByCepServiceService;
    let lojaRepositoryMock: Partial<LojaRepository>;
    let loggerMock: Partial<ServicoDeLogger>;
    let hereMapsServiceMock: Partial<HereMapsService>;
    let correiosServiceMock: Partial<CorreiosService>;
    let hereMapsServiceDeliveryMock: Partial<HereMapsServiceDelivery>;

    beforeEach(async () => {
        lojaRepositoryMock = {
            findAll: jest.fn(),
            count: jest.fn(),
        };
        loggerMock = {
            log: jest.fn(),
            error: jest.fn(),
        };
        hereMapsServiceMock = {};
        correiosServiceMock = {};
        hereMapsServiceDeliveryMock = {};

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                findByCepServiceService,
                { provide: LojaRepository, useValue: lojaRepositoryMock },
                { provide: ServicoDeLogger, useValue: loggerMock },
                { provide: HereMapsService, useValue: hereMapsServiceMock },
                { provide: CorreiosService, useValue: correiosServiceMock },
                {
                    provide: HereMapsServiceDelivery,
                    useValue: hereMapsServiceDeliveryMock,
                },
            ],
        }).compile();

        service = module.get<findByCepServiceService>(findByCepServiceService);
    });

    it('Deve retornar lojas categorizadas corretamente com lojas a menos e mais de 50km', async () => {
        const mockCoordinates = { latitude: -23.5489, longitude: -46.6388 };
        const mockLojasData = [
            { id: 1, name: 'Loja 1', distancia: 30 },
            { id: 2, name: 'Loja 2', distancia: 60 },
        ];
        const mockCategorias = { tipoA: [], tipoB: [] };

        (getCoordinates as jest.Mock).mockResolvedValue(mockCoordinates);
        (calculateDistances as jest.Mock).mockReturnValue(mockLojasData);
        (filterStores as jest.Mock).mockResolvedValue({
            lojasMenor50Km: [{ id: 1, name: 'Loja 1', distancia: 30 }],
            lojasMaiorIgual50Km: [{ id: 2, name: 'Loja 2', distancia: 60 }],
        });
        (categorizeStores as jest.Mock).mockReturnValue(mockCategorias);

        lojaRepositoryMock.findAll = jest.fn().mockResolvedValue(mockLojasData);
        lojaRepositoryMock.count = jest.fn().mockResolvedValue(2);

        const result = await service.findByCep('12345678', 10, 0);

        expect(result).toEqual({
            stores: {
                menor50Km: mockCategorias,
                maiorIgual50Km: [{ id: 2, name: 'Loja 2', distancia: 60 }],
            },
            limit: 10,
            offset: 0,
            total: 2,
        });

        expect(loggerMock.log).toHaveBeenCalledWith(
            'Busca de lojas por CEP concluída com sucesso.'
        );
    });

    it('Deve lançar erro caso não encontre coordenadas', async () => {
        (getCoordinates as jest.Mock).mockResolvedValue(null);

        const result = await service.findByCep('12345678');

        expect(result).toEqual({
            mensagem: 'Erro ao buscar lojas por CEP.',
            detalhes: {
                mensagem: 'Falha ao obter coordenadas.',
                stack: expect.any(String),
            },
        });

        expect(loggerMock.error).toHaveBeenCalledWith(
            expect.stringContaining('Falha ao obter coordenadas'),
            expect.any(Error)
        );
    });

    it('Deve retornar erro caso nenhuma loja seja encontrada no banco de dados', async () => {
        (getCoordinates as jest.Mock).mockResolvedValue({
            latitude: -23.5489,
            longitude: -46.6388,
        });
        lojaRepositoryMock.findAll = jest.fn().mockResolvedValue([]);

        const result = await service.findByCep('12345678');

        expect(result).toEqual({
            mensagem: 'Erro ao buscar lojas por CEP.',
            detalhes: {
                mensagem: 'Nenhuma loja encontrada.',
                stack: expect.any(String),
            },
        });

        expect(loggerMock.error).toHaveBeenCalledWith(
            expect.stringContaining('Nenhuma loja encontrada'),
            expect.any(Error)
        );
    });
});
