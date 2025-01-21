import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdService } from '../service/findByIdLojaService';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';

describe('FindByIdService', () => {
    let service: FindByIdService;
    let lojaRepository: Partial<LojaRepository>;

    beforeEach(async () => {
        lojaRepository = {
            findById: jest.fn().mockResolvedValue(null),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindByIdService,
                { provide: LojaRepository, useValue: lojaRepository },
                {
                    provide: ServicoDeLogger,
                    useValue: {
                        log: jest.fn(),
                        warn: jest.fn(),
                        error: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<FindByIdService>(FindByIdService);
    });

    it('should return an empty array if store is not found', async () => {
        const result = await service.findById('invalidId');
        expect(result).toEqual({
            stores: [],
            limit: 1,
            offset: 0,
            total: 0,
            mensagem: 'Loja com ID invalidId não encontrada.',
        });
    });

    it('should return store if store is found', async () => {
        const lojaMock = {
            _id: '123',
            nome: 'Loja 1',
            endereco: 'Endereco 1',
            telefone: 'Telefone 1',
            toObject: () => ({
                _id: '123',
                nome: 'Loja 1',
                endereco: 'Endereco 1',
                telefone: 'Telefone 1',
            }),
        };
        lojaRepository.findById = jest.fn().mockResolvedValue(lojaMock);

        const result = await service.findById('123');
        expect(result).toEqual({
            stores: [
                {
                    nome: 'Loja 1',
                    endereco: 'Endereco 1',
                    telefone: 'Telefone 1',
                },
            ],
            limit: 1,
            offset: 0,
            total: 1,
        });
    });
});
