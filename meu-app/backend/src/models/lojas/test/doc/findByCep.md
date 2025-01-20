# Documentação de Cenários de Teste - `findByCepServiceService`

## Índice

1. [Descrição Geral](#descricao-geral)
2. [Cenários Testados](#cenários-testados)
    - [Cenário 1: Retorno Bem-Sucedido de Lojas Categorizadas por Distância](#1-retorno-bem-sucedido-de-lojas-categorizadas-por-distância)
    - [Cenário 2: Falha ao Obter Coordenadas do CEP](#2-falha-ao-obter-coordenadas-do-cep)
    - [Cenário 3: Nenhuma Loja Encontrada no Banco de Dados](#3-nenhuma-loja-encontrada-no-banco-de-dados)

## Descrição Geral

O serviço `findByCepServiceService` é responsável por localizar e categorizar lojas com base em um CEP fornecido. Esta documentação apresenta os cenários de teste utilizados para garantir o correto funcionamento desta funcionalidade, bem como sugestões de cenários adicionais para aumentar a cobertura dos testes.

---

## Cenários Testados

### **1. Retorno Bem-Sucedido de Lojas Categorizadas por Distância**

-   **Descrição:**
    O método deve retornar corretamente lojas categorizadas em duas listas:

    -   **`menor50Km`**: Lojas com distância menor que 50 km.
    -   **`maiorIgual50Km`**: Lojas com distância maior ou igual a 50 km.

-   **Mocks Utilizados:**

    -   **`getCoordinates`**: Retorna coordenadas simuladas.
    -   **`calculateDistances`**: Retorna distâncias simuladas das lojas.
    -   **`filterStores`**: Retorna as lojas separadas por distâncias.
    -   **`categorizeStores`**: Retorna categorias de lojas vazias.
    -   **`lojaRepository.findAll`**: Simula dados de lojas no banco de dados.
    -   **`lojaRepository.count`**: Simula a contagem total de lojas.

-   **Resultado Esperado:**
    -   A lista de lojas categorizada é retornada corretamente.
    -   O log de sucesso é registrado: `Busca de lojas por CEP concluída com sucesso.`

---

### **2. Falha ao Obter Coordenadas do CEP**

-   **Descrição:**
    O método deve lidar corretamente com o caso em que não é possível obter as coordenadas do CEP fornecido.

-   **Mocks Utilizados:**

    -   **`getCoordinates`**: Retorna `null`.

-   **Resultado Esperado:**
    -   O método retorna um erro com a mensagem:
        ```json
        {
            "mensagem": "Erro ao buscar lojas por CEP.",
            "detalhes": {
                "mensagem": "Falha ao obter coordenadas.",
                "stack": "..."
            }
        }
        ```
    -   O log de erro é registrado: `Falha ao obter coordenadas.`

---

### **3. Nenhuma Loja Encontrada no Banco de Dados**

-   **Descrição:**
    O método deve tratar corretamente o caso em que nenhuma loja é encontrada no banco de dados.

-   **Mocks Utilizados:**

    -   **`getCoordinates`**: Retorna coordenadas simuladas.
    -   **`lojaRepository.findAll`**: Retorna uma lista vazia.

-   **Resultado Esperado:**
    -   O método retorna um erro com a mensagem:
        ```json
        {
            "mensagem": "Erro ao buscar lojas por CEP.",
            "detalhes": {
                "mensagem": "Nenhuma loja encontrada.",
                "stack": "..."
            }
        }
        ```
    -   O log de erro é registrado: `Nenhuma loja encontrada.`
