import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoController } from './controller/produtoController';
import { ProdutoService } from './service/produtoService';
import { ProdutoRepository } from './repo/produtoRepo';
import { ProdutoSchema } from './schema/ProdutoSchema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Produto', schema: ProdutoSchema }]),
    ],
    providers: [ProdutoService, ProdutoRepository],
    controllers: [ProdutoController],
    exports: [ProdutoService],
})
export class ProdutoModule {}
