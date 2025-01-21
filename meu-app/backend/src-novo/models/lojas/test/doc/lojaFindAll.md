# Testes do Serviço `FindAllLojaService`

## Índice

1. [Configuração do Teste](#configuração-do-teste)
2. [Cenários de Teste](#cenários-de-teste)
    - [Cenário 1: Retornar todas as lojas com limite e offset](#cenário-1-retornar-todas-as-lojas-com-limite-e-offset)
    - [Cenário 2: Retornar uma lista vazia quando nenhuma loja é encontrada](#cenário-2-retornar-uma-lista-vazia-quando-nenhuma-loja-é-encontrada)

## Configuração do Teste

-   **Serviço**: `FindAllLojaService`
-   **Dependências Mockadas**:
    -   `LojaRepository`: Mock para o repositório de lojas.
    -   `ServicoDeLogger`: Mock para o serviço de logger.

## Cenários de Teste

### Cenário 1: Retornar todas as lojas com limite e offset

-   **Descrição**: Verifica se o serviço retorna todas as lojas corretamente ao aplicar limite e offset.
-   **Expectativa**: O serviço deve retornar uma lista de lojas com as informações corretas, juntamente com os valores de limite, offset e total de lojas.

### Cenário 2: Retornar uma lista vazia quando nenhuma loja é encontrada

-   **Descrição**: Verifica se o serviço retorna uma lista vazia e uma mensagem apropriada quando nenhuma loja é encontrada.
-   **Expectativa**: O serviço deve retornar uma lista vazia com uma mensagem indicando que nenhuma loja foi encontrada.
