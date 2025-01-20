import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProdutoDto } from '../dtos/createProdutoDto';
import { UpdateProdutoDto } from '../dtos/updateProdutoDto';
import { ProdutoService } from '../service/produtoService';
import { ProdutoDocument } from '../schema/ProdutoSchema';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Search all produto' })
    async findAllProdutos(): Promise<ProdutoDocument[]> {
        return await this.produtoService.findAllProdutos();
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new produto' })
    async createProduto(
        @Body() data: CreateProdutoDto
    ): Promise<ProdutoDocument> {
        return await this.produtoService.createProduto(data);
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Search a produto by id' })
    async findProdutoById(@Param('id') id: string): Promise<ProdutoDocument> {
        return await this.produtoService.findProdutoById(id);
    }

    @Put(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Update a produto' })
    async updateProduto(
        @Param('id') id: string,
        @Body() data: UpdateProdutoDto
    ): Promise<ProdutoDocument> {
        return await this.produtoService.updateProduto(id, data);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a produto' })
    async deleteProduto(@Param('id') id: string): Promise<void> {
        await this.produtoService.deleteProduto(id);
    }
}
