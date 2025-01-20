import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '../service/produtoService';
import { ProdutoRepository } from '../repo/produtoRepo';

const mockRepository = {
    deleteProduto: jest.fn(),
};

describe('ProdutoService - deleteProduto', () => {
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

    it('should delete a produto', async () => {
        mockRepository.deleteProduto.mockResolvedValue(undefined);

        await service.deleteProduto('1');

        expect(mockRepository.deleteProduto).toHaveBeenCalledWith('1');
        expect(mockRepository.deleteProduto).toHaveBeenCalledTimes(1);
    });
});
