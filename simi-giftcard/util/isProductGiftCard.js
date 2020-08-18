export const isProductGiftCard = product =>
    product && product.__typename === 'BssGiftCardProduct';