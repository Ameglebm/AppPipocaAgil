import { Test, TestingModule } from '@nestjs/testing';
import { FindAllLojaService } from '../service/findAllLojaService';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';

describe('FindAllLojaService', () => {
    let service: FindAllLojaService;
    let repository: Partial<LojaRepository>;

    beforeEach(async () => {
        repository = {
            findAll: jest.fn().mockResolvedValue([
                {
                    _id: '1',
                    nome: 'Loja 1',
                    endereco: 'Endereço 1',
                    tempoDePreparo: 10,
                    disponivelNoEstoque: true,
                    toObject: jest.fn().mockReturnValue({
                        _id: '1',
                        nome: 'Loja 1',
                        endereco: 'Endereço 1',
                    }),
                },
                {
                    _id: '2',
                    nome: 'Loja 2',
                    endereco: 'Endereço 2',
                    tempoDePreparo: 15,
                    disponivelNoEstoque: false,
                    toObject: jest.fn().mockReturnValue({
                        _id: '2',
                        nome: 'Loja 2',
                        endereco: 'Endereço 2',
                    }),
                },
            ]),
            count: jest.fn().mockResolvedValue(2),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllLojaService,
                { provide: LojaRepository, useValue: repository },
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

        service = module.get<FindAllLojaService>(FindAllLojaService);
    });

    it('should return all stores with limit and offset', async () => {
        const result = await service.findAll(2, 0);
        expect(result).toEqual({
            stores: [
                { _id: '1', nome: 'Loja 1', endereco: 'Endereço 1' },
                { _id: '2', nome: 'Loja 2', endereco: 'Endereço 2' },
            ],
            limit: 2,
            offset: 0,
            total: 2,
        });
    });

    it('should return an empty list when no stores are found', async () => {
        (repository.findAll as jest.Mock).mockResolvedValueOnce([]);
        const result = await service.findAll(2, 0);
        expect(result).toEqual({
            stores: [],
            limit: 2,
            offset: 0,
            total: 2,
            mensagem: 'Nenhuma loja encontrada.',
        });
    });
});
