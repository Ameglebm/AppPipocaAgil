import { Test, TestingModule } from '@nestjs/testing';
import { CreateLojaService } from '../service/createLojaService';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';
import { CreateLojaDto } from '../dtos/lojaDto';
import { LojaDocument } from '../schema/lojaSchema';

describe('CreateLojaService', () => {
    let service: CreateLojaService;
    let lojaRepository: Partial<LojaRepository>;
    let logger: Partial<ServicoDeLogger>;

    beforeEach(async () => {
        lojaRepository = {
            create: jest.fn(),
        };

        logger = {
            log: jest.fn(),
            error: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateLojaService,
                { provide: LojaRepository, useValue: lojaRepository },
                { provide: ServicoDeLogger, useValue: logger },
            ],
        }).compile();

        service = module.get<CreateLojaService>(CreateLojaService);
    });

    it('should create a loja successfully', async () => {
        const createLojaDto: CreateLojaDto = {
            storeName: 'MEOWBLE 03',
            type: 'LOJA',
            takeOutInStore: true,
            shippingTimeInDays: 4,
            latitude: '-23.21287',
            longitude: '-46.83805',
            postalCode: '13220-001',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
        };

        const lojaMock: Partial<LojaDocument> = {
            _id: '123',
            storeName: 'MEOWBLE 03',
            type: 'LOJA',
            takeOutInStore: true,
            shippingTimeInDays: 4,
            latitude: '-23.21287',
            longitude: '-46.83805',
            postalCode: '13220-001',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
            toObject: () => ({
                _id: '123',
                storeName: 'MEOWBLE 03',
                type: 'LOJA',
                takeOutInStore: true,
                shippingTimeInDays: 4,
                latitude: '-23.21287',
                longitude: '-46.83805',
                postalCode: '13220-001',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
            }),
        };

        lojaRepository.create = jest.fn().mockResolvedValue(lojaMock);

        const result = await service.create(createLojaDto);

        expect(result).toEqual(lojaMock);
        expect(logger.log).toHaveBeenCalledWith(
            'Recebendo dados para criação da loja...'
        );
        expect(logger.log).toHaveBeenCalledWith('Loja criada com sucesso!');
        expect(lojaRepository.create).toHaveBeenCalledWith(createLojaDto);
    });

    it('should throw an error if creation fails', async () => {
        const createLojaDto: CreateLojaDto = {
            storeName: 'MEOWBLE 03',
            type: 'LOJA',
            takeOutInStore: true,
            shippingTimeInDays: 4,
            latitude: '-23.21287',
            longitude: '-46.83805',
            postalCode: '13220-001',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
        };

        lojaRepository.create = jest
            .fn()
            .mockRejectedValue(new Error('Erro na criação'));

        await expect(service.create(createLojaDto)).rejects.toThrow(
            'Falha na criação da loja. Por favor, tente novamente.'
        );
        expect(logger.log).toHaveBeenCalledWith(
            'Recebendo dados para criação da loja...'
        );
        expect(logger.error).toHaveBeenCalledWith(
            'Erro ao tentar criar a loja:',
            expect.any(Error)
        );
        expect(lojaRepository.create).toHaveBeenCalledWith(createLojaDto);
    });
});
