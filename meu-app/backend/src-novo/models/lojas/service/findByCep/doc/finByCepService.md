# Documentação do Serviço `findByCepServiceService`

## Índice

1. [Introdução](#introdução)
2. [Dependências](#dependências)
3. [Funcionamento do Serviço](#funcionamento-do-serviço)
    - [Obter Coordenadas](#obter-coordenadas)
    - [Listar Todas as Lojas](#listar-todas-as-lojas)
    - [Calcular Distâncias](#calcular-distâncias)
    - [Filtrar Lojas](#filtrar-lojas)
    - [Categorizar Lojas](#categorizar-lojas)
4. [Tratamento de Erros](#tratamento-de-erros)
5. [Regras de Negócio](#regras-de-negócio)

## Introdução

Este documento tem como objetivo fornecer uma visão detalhada do serviço `findByCepServiceService` que permite buscar lojas baseadas em um CEP fornecido.

## Dependências

O serviço depende dos seguintes módulos e serviços:

-   `@nestjs/common`: Módulo do NestJS para criação de serviços.
-   `LojaRepository`: Repositório para acesso ao banco de dados de lojas.
-   `ServicoDeLogger`: Serviço de log para registrar atividades e erros.
-   `HereMapsService`: Serviço para obtenção de coordenadas geográficas a partir de um CEP.
-   `CorreiosService`: Serviço para cálculo de frete e entrega.
-   `HereMapsServiceDelivery`: Serviço para cálculo de rotas de entrega.

## Funcionamento do Serviço

### Obter Coordenadas

O método `getCoordinates` utiliza o `HereMapsService` para obter as coordenadas (latitude e longitude) do CEP fornecido.

```typescript
const coordenadas = await getCoordinates(
    this.hereMapsService,
    cep,
    this.logger
);
```

### Listar Todas as Lojas

O método `findAll` do `LojaRepository` é utilizado para listar todas as lojas do banco de dados, com suporte para paginação.

```typescript
const lojasData = await this.lojaRepository.findAll(limit, offset);
```

### Calcular Distâncias

O método `calculateDistances` calcula as distâncias das lojas em relação às coordenadas obtidas.

```typescript
const lojasComDistancia = calculateDistances(
    lojasData,
    coordenadas,
    this.logger
);
```

### Filtrar Lojas

O método `filterStores` filtra as lojas com base na distância (menor que 50 km ou maior ou igual a 50 km) e calcula o frete e o delivery.

```typescript
const { lojasMenor50Km, lojasMaiorIgual50Km } = await filterStores(
    lojasComDistancia,
    50,
    this.correiosService,
    this.logger,
    cep,
    coordenadas.latitude.toString(),
    coordenadas.longitude.toString(),
    this.hereMapsServiceDelivery
);
```

### Categorizar Lojas

O método `categorizeStores` categoriza as lojas filtradas.

```typescript
const tiposDeLojasMenor50Km = categorizeStores(lojasMenor50Km, this.logger);
```

## Tratamento de Erros

O serviço possui tratamento de erros para cada etapa do processo, registrando logs de erro detalhados e retornando mensagens apropriadas em caso de falha.

```typescript
catch (error: unknown) { ... }
```

## Regras de Negócio

As principais regras de negócio implementadas no serviço `findByCepServiceService` são:

-   **Obtenção de Coordenadas**: A partir do CEP fornecido, obter as coordenadas geográficas.
-   **Listagem de Lojas**: Recuperar todas as lojas disponíveis no banco de dados, com paginação.
-   **Cálculo de Distâncias**: Calcular a distância entre as coordenadas fornecidas e as lojas.
-   **Filtragem de Lojas**: Dividir as lojas em duas categorias (menor que 50 km e maior ou igual a 50 km) e calcular frete (para lojas tipo:loja ocultando as tipo:PDV) e delivery (para ambos os tipos).
-   **Categorização de Lojas**: Categorizar as lojas de acordo com critérios específicos (LOJA | PDV).
