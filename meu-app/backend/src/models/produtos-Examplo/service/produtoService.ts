import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from '../dtos/createProdutoDto';
import { UpdateProdutoDto } from '../dtos/updateProdutoDto';
import { ProdutoRepository } from '../repo/produtoRepo';
import { ProdutoDocument } from '../schema/ProdutoSchema';

@Injectable()
export class ProdutoService {
    constructor(private repository: ProdutoRepository) {}

    async findAllProdutos(): Promise<ProdutoDocument[]> {
        return this.repository.findAllProdutos();
    }

    async createProduto(data: CreateProdutoDto): Promise<ProdutoDocument> {
        return this.repository.createProduto(data);
    }

    async findProdutoById(id: string): Promise<ProdutoDocument> {
        return this.repository.findProdutoById(id);
    }

    async updateProduto(
        id: string,
        data: UpdateProdutoDto
    ): Promise<ProdutoDocument> {
        return this.repository.updateProduto(id, data);
    }

    async deleteProduto(id: string): Promise<void> {
        return this.repository.deleteProduto(id);
    }
}
