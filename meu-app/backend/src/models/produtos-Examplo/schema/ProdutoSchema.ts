import mongoose, { model } from 'mongoose';
import { ProdutoDocument } from '../interface/produtoInterface';

const ProdutoSchema = new mongoose.Schema({
    nomeProduto: { type: String, required: true },
    descricaoProduto: { type: String, required: true },
    precoProduto: { type: Number, required: true },
    caminhoImg: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Produto = mongoose.model('Produto', ProdutoSchema);
export { Produto, ProdutoSchema };

export const ProdutoModel = model<ProdutoDocument>('Produto', ProdutoSchema);
export type { ProdutoDocument };
