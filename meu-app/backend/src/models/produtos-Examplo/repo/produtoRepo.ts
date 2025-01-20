import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProdutoDto } from '../dtos/createProdutoDto';
import { UpdateProdutoDto } from '../dtos/updateProdutoDto';
import { ProdutoDocument, Produto } from '../schema/ProdutoSchema';

@Injectable()
export class ProdutoRepository {
    constructor(
        @InjectModel('Produto')
        private produtoModel: Model<ProdutoDocument>
    ) {}

    async findAllProdutos(): Promise<ProdutoDocument[]> {
        return await this.produtoModel.find().exec();
    }

    async createProduto(data: CreateProdutoDto): Promise<ProdutoDocument> {
        const produto = new this.produtoModel(data);
        return await produto.save();
    }

    async findProdutoById(id: string): Promise<ProdutoDocument> {
        const produto = await this.produtoModel.findById(id).exec();

        if (!produto) {
            throw new NotFoundException('Produto not found');
        }

        return produto;
    }

    async updateProduto(
        id: string,
        data: UpdateProdutoDto
    ): Promise<ProdutoDocument> {
        const produto = await this.produtoModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();

        if (!produto) {
            throw new NotFoundException('Produto not found');
        }

        return produto;
    }

    async deleteProduto(id: string): Promise<void> {
        const produto = await this.produtoModel.findByIdAndDelete(id).exec();

        if (!produto) {
            throw new NotFoundException('Produto not found');
        }
    }
}
