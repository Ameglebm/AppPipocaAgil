import { LojaComDistancia } from '../../interface/lojaComDistanciaInterface';

function formatStoreData(
    loja: LojaComDistancia,
    frete: any,
    distanciaKm: number,
    shippingTimeInDays: number,
    deliveryCost?: { estimatedTimeMin: number; totalCost: number }
) {
    return {
        name: loja.storeName,
        postalCode: loja.postalCode,
        city: loja.city,
        type: loja.type,
        distance: `${distanciaKm.toFixed(0)} km`,
        value: frete.map((item: any) => {
            const prazoMatch = item.prazo.match(/(\d+)/);
            const prazoDias = prazoMatch ? parseInt(prazoMatch[0], 10) : 0;
            const novoPrazo = prazoDias + shippingTimeInDays;
            return {
                prazo: `${novoPrazo} dias úteis`,
                codProdutoAgencia: item.codProdutoAgencia,
                price: item.precoAgencia,
                description: item.urlTitulo,
            };
            // prazo:'${item.prazo + shippingTimeInDays}',
            // codProdutoAgencia: item.codProdutoAgencia,
            // price: item.precoAgencia,
            // description: item.urlTitulo,
        }),
        delivery: deliveryCost
            ? {
                  estimatedTimeMin: deliveryCost.estimatedTimeMin,
                  totalCost: `R$ ${deliveryCost.totalCost.toFixed(2)}`,
              }
            : undefined,
        pins: {
            position: {
                lat: loja.latitude,
                lng: loja.longitude,
            },
            title: loja.storeName,
        },
    };
}

export default formatStoreData;
