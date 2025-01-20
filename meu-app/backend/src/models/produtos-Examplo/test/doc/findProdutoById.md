# Documentação de Teste para `ProdutoService - findProdutoById`

## Índice

1. [Introdução](#introdução)
2. [Dependências](#dependências)
3. [Configuração do Módulo de Teste](#configuração-do-módulo-de-teste)
4. [Cenário de Teste](#cenário-de-teste)
    - [Mock do Repositório](#mock-do-repositório)
    - [Teste de Retorno de Produto por ID](#teste-de-retorno-de-produto-por-id)

## Introdução

Esta documentação detalha o cenário de teste do método `findProdutoById` no serviço `ProdutoService`, utilizando o framework de testes do NestJS.

## Dependências

As principais dependências utilizadas no teste são:

-   `@nestjs/testing`: Para criar e configurar módulos de teste do NestJS.
-   `ProdutoService`: Serviço que está sendo testado.
-   `ProdutoRepository`: Repositório usado pelo serviço.
-   `ProdutoDocument`: Schema do documento do produto.

## Configuração do Módulo de Teste

O módulo de teste é configurado utilizando o `TestingModule` do NestJS. Aqui, o repositório é fornecido como um mock para controlar as respostas durante o teste.

```typescript
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
```

## Cenário de Teste

### Mock do Repositório

O repositório `ProdutoRepository` é mockado utilizando o `jest.fn()` para simular a busca de um produto por ID.

```typescript
const mockRepository = {
    findProdutoById: jest.fn(),
};
```

### Teste de Retorno de Produto por ID

O teste verifica se o método `findProdutoById` no serviço `ProdutoService` retorna corretamente um produto pelo ID fornecido.

```typescript
it('should return a produto by id', async () => {
    const produto: Partial<ProdutoDocument> = {
        _id: '1',
        nomeProduto: 'Produto',
        descricaoProduto: 'Descrição',
        precoProduto: 15,
        createdAt: new Date(),
    };
    mockRepository.findProdutoById.mockResolvedValue(produto);

    const result = await service.findProdutoById('1');

    expect(result).toEqual(produto);
    expect(mockRepository.findProdutoById).toHaveBeenCalledWith('1');
    expect(mockRepository.findProdutoById).toHaveBeenCalledTimes(1);
});
```
