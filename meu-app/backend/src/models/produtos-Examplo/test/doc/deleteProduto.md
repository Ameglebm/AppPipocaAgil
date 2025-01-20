# Documentação de Teste para `ProdutoService - deleteProduto`

## Índice

1. [Introdução](#introdução)
2. [Dependências](#dependências)
3. [Configuração do Módulo de Teste](#configuração-do-módulo-de-teste)
4. [Cenário de Teste](#cenário-de-teste)
    - [Mock do Repositório](#mock-do-repositório)
    - [Teste de Deleção de Produto](#teste-de-deleção-de-produto)

## Introdução

Esta documentação detalha o cenário de teste do método `deleteProduto` no serviço `ProdutoService`, utilizando o framework de testes do NestJS.

## Dependências

As principais dependências utilizadas no teste são:

-   `@nestjs/testing`: Para criar e configurar módulos de teste do NestJS.
-   `ProdutoService`: Serviço que está sendo testado.
-   `ProdutoRepository`: Repositório usado pelo serviço.

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

O repositório `ProdutoRepository` é mockado utilizando o `jest.fn()` para simular a deleção de um produto.

```typescript
const mockRepository = {
    deleteProduto: jest.fn(),
};
```

### Teste de Deleção de Produto

O teste verifica se o método `deleteProduto` no serviço `ProdutoService` deleta corretamente um produto.

```typescript
it('should delete a produto', async () => {
    mockRepository.deleteProduto.mockResolvedValue(undefined);

    await service.deleteProduto('1');

    expect(mockRepository.deleteProduto).toHaveBeenCalledWith('1');
    expect(mockRepository.deleteProduto).toHaveBeenCalledTimes(1);
});
```
