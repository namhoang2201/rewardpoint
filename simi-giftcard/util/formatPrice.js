import patches from '@magento/peregrine/lib/util/intlPatches';

export const formatPrice = (value, currencyCode) => {
    const parts = patches.toParts.call(
        Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode
        }),
        value
    );

    let price = '';
    parts.forEach((part) => {
        price += part.value
    })

    return price
}