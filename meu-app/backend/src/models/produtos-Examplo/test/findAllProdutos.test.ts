import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '../service/produtoService';
import { ProdutoRepository } from '../repo/produtoRepo';
import { ProdutoDocument } from '../schema/ProdutoSchema';

const mockRepository = {
    findAllProdutos: jest.fn(),
};

describe('ProdutoService - findAllProdutos', () => {
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

    it('should return an array of produtos', async () => {
        const produtos: Partial<ProdutoDocument>[] = [
            {
                _id: '1',
                nomeProduto: 'Produto 1',
                descricaoProduto: 'Descrição',
                precoProduto: 10,
                createdAt: new Date(),
            },
        ];
        mockRepository.findAllProdutos.mockResolvedValue(produtos);

        const result = await service.findAllProdutos();

        expect(result).toEqual(produtos);
        expect(mockRepository.findAllProdutos).toHaveBeenCalledTimes(1);
    });
});
