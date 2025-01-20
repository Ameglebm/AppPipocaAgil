import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '../service/produtoService';
import { ProdutoRepository } from '../repo/produtoRepo';
import { ProdutoDocument } from '../schema/ProdutoSchema';

const mockRepository = {
    findProdutoById: jest.fn(),
};

describe('ProdutoService - findProdutoById', () => {
    let service: ProdutoService;
    let repository: ProdutoRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProdutoService,
                { provide: ProdutoRepository, useValue: mockRepository },
            ],
        }).compile();

        service = module.get<ProdutoService>(ProdutoService);
        repository = module.get<ProdutoRepository>(ProdutoRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a produto by id', async () => {
        const produto: Partial<ProdutoDocument> = {
            _id: '1',
            nomeProduto: 'Produto',
            descricaoProduto: 'Descrição',
            precoProduto: 15,
            createdAt: new Date(),
        };
        mockRepository.findProdutoById.mockResolvedValue(produto);

        const result = await service.findProdutoById('1');

        expect(result).toEqual(produto);
        expect(mockRepository.findProdutoById).toHaveBeenCalledWith('1');
        expect(mockRepository.findProdutoById).toHaveBeenCalledTimes(1);
    });
});
