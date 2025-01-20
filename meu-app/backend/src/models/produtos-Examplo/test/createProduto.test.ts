import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '../service/produtoService';
import { ProdutoRepository } from '../repo/produtoRepo';
import { CreateProdutoDto } from '../dtos/createProdutoDto';
import { ProdutoDocument } from '../schema/ProdutoSchema';

const mockRepository = {
    createProduto: jest.fn(),
};

describe('ProdutoService - createProduto', () => {
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

    it('should create and return a produto', async () => {
        const createDto: CreateProdutoDto = {
            nomeProduto: 'Novo Produto',
            descricaoProduto: 'Nova descrição',
            precoProduto: 20,
            caminhoImg: 'a',
        };
        const createdProduto: Partial<ProdutoDocument> = {
            _id: '1',
            ...createDto,
            createdAt: new Date(),
        };
        mockRepository.createProduto.mockResolvedValue(createdProduto);

        const result = await service.createProduto(createDto);

        expect(result).toEqual(createdProduto);
        expect(mockRepository.createProduto).toHaveBeenCalledWith(createDto);
        expect(mockRepository.createProduto).toHaveBeenCalledTimes(1);
    });
});
