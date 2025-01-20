# Documentação de Teste para `ProdutoService - createProduto`

## Índice

1. [Introdução](#introdução)
2. [Dependências](#dependências)
3. [Configuração do Módulo de Teste](#configuração-do-módulo-de-teste)
4. [Cenário de Teste](#cenário-de-teste)
    - [Mock do Repositório](#mock-do-repositório)
    - [Teste de Criação de Produto](#teste-de-criação-de-produto)

## Introdução

Esta documentação detalha o cenário de teste do método `createProduto` no serviço `ProdutoService`, utilizando o framework de testes do NestJS.

## Dependências

As principais dependências utilizadas no teste são:

-   `@nestjs/testing`: Para criar e configurar módulos de teste do NestJS.
-   `ProdutoService`: Serviço que está sendo testado.
-   `ProdutoRepository`: Repositório usado pelo serviço.
-   `CreateProdutoDto`: Data Transfer Object (DTO) usado para criar um produto.
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

O repositório `ProdutoRepository` é mockado utilizando o `jest.fn()` para simular a criação de um produto.

```typescript
const mockRepository = {
    createProduto: jest.fn(),
};
```

### Teste de Criação de Produto

O teste verifica se o método `createProduto` no serviço `ProdutoService` cria e retorna corretamente um produto.

```typescript
it('should create and return a produto', async () => {
    const createDto: CreateProdutoDto = {
        nomeProduto: 'Novo Produto',
        descricaoProduto: 'Nova descrição',
        precoProduto: 20,
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
```
