import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from '../service/produtoService';
import { ProdutoRepository } from '../repo/produtoRepo';
import { UpdateProdutoDto } from '../dtos/updateProdutoDto';
import { ProdutoDocument } from '../schema/ProdutoSchema';

const mockRepository = {
    updateProduto: jest.fn(),
};

describe('ProdutoService - updateProduto', () => {
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

    it('should update and return the produto', async () => {
        const updateDto: UpdateProdutoDto = {
            nomeProduto: 'Produto Atualizado',
        };
        const updatedProduto: Partial<ProdutoDocument> = {
            _id: '1',
            nomeProduto: 'Produto Atualizado',
            descricaoProduto: 'Descrição',
            precoProduto: 15,
            caminhoImg: 'b',
            createdAt: new Date(),
        };
        mockRepository.updateProduto.mockResolvedValue(updatedProduto);

        const result = await service.updateProduto('1', updateDto);

        expect(result).toEqual(updatedProduto);
        expect(mockRepository.updateProduto).toHaveBeenCalledWith(
            '1',
            updateDto
        );
        expect(mockRepository.updateProduto).toHaveBeenCalledTimes(1);
    });
});
