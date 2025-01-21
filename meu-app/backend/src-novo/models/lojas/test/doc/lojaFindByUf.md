# Testes do Serviço `FindByUfService`

## Índice

1. [Introdução](#introdução)
2. [Cenários de Teste](#cenários-de-teste)
    - [Cenário 1: Retornar uma lista vazia se nenhuma loja for encontrada](#cenário-1-retornar-uma-lista-vazia-se-nenhuma-loja-for-encontrada)
    - [Cenário 2: Retornar lojas filtradas se lojas forem encontradas](#cenário-2-retornar-lojas-filtradas-se-lojas-forem-encontradas)

## Introdução

Este documento descreve os cenários de teste para o serviço `FindByUfService`. O objetivo é garantir que o serviço funcione corretamente em diferentes situações, retornando as informações adequadas das lojas ou mensagens de erro apropriadas.

## Cenários de Teste

### Cenário 1: Retornar uma lista vazia se nenhuma loja for encontrada

-   **Descrição**: Verifica se o serviço retorna uma resposta apropriada quando nenhuma loja é encontrada.
-   **Expectativa**:
    -   Mockar o método `findByUf` do `LojaRepository` para retornar uma lista vazia.
    -   Chamar o método `findByUf` do `FindByUfService` com uma UF válida (`'SP'`).
    -   Verificar se o resultado do serviço retorna:
        ```json
        {
            "stores": [],
            "limit": 1,
            "offset": 0,
            "total": 0,
            "mensagem": "Nenhuma loja encontrada na UF SP."
        }
        ```
    -   Verificar que o logger registra a mensagem de erro apropriada.

### Cenário 2: Retornar lojas filtradas se lojas forem encontradas

-   **Descrição**: Verifica se o serviço retorna os detalhes corretos das lojas quando lojas são encontradas.
-   **Expectativa**:
    -   Mockar o método `findByUf` do `LojaRepository` para retornar uma lista de lojas mockadas.
    -   Mockar o método `countByUf` do `LojaRepository` para retornar o número total de lojas encontradas.
    -   Chamar o método `findByUf` do `FindByUfService` com uma UF válida (`'SP'`).
    -   Verificar se o resultado do serviço retorna:
        ```json
        {
            "stores": [
                {
                    "nome": "Loja 1",
                    "endereco": "Endereco 1",
                    "telefone": "Telefone 1"
                }
            ],
            "limit": 1,
            "offset": 0,
            "total": 1
        }
        ```
    -   Verificar que o logger registra a mensagem de sucesso.
