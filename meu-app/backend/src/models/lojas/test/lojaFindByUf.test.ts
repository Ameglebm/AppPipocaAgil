import { Test, TestingModule } from '@nestjs/testing';
import { FindByUfService } from '../service/findByUfService';
import { LojaRepository } from '../repo/lojaRepo';
import { ServicoDeLogger } from '../../utils/logger/logger';

describe('FindByUfService', () => {
    let service: FindByUfService;
    let lojaRepository: Partial<LojaRepository>;

    beforeEach(async () => {
        lojaRepository = {
            findByUf: jest.fn().mockResolvedValue([]),
            countByUf: jest.fn().mockResolvedValue(0),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindByUfService,
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

        service = module.get<FindByUfService>(FindByUfService);
    });

    it('should return an empty array if no stores are found', async () => {
        const result = await service.findByUf('SP');
        expect(result).toEqual({
            stores: [],
            limit: 1,
            offset: 0,
            total: 0,
            mensagem: 'Nenhuma loja encontrada na UF SP.',
        });
    });

    it('should return filtered stores if stores are found', async () => {
        const lojasMock = [
            {
                nome: 'Loja 1',
                endereco: 'Endereco 1',
                telefone: 'Telefone 1',
                toObject: () => ({
                    nome: 'Loja 1',
                    endereco: 'Endereco 1',
                    telefone: 'Telefone 1',
                }),
            },
        ];
        lojaRepository.findByUf = jest.fn().mockResolvedValue(lojasMock);
        lojaRepository.countByUf = jest.fn().mockResolvedValue(1);

        const result = await service.findByUf('SP');
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
