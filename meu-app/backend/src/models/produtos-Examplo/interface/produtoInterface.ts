export interface ProdutoDocument extends Document, ProdutoLoja {}

export interface ProdutoLoja {
    _id: string;
    nomeProduto: string;
    descricaoProduto: string;
    precoProduto: number;
    caminhoImg: string;
    createdAt: Date;
}
