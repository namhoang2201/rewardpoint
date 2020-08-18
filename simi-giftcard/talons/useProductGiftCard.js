import React, { useCallback, useState, useMemo } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAppContext } from '@magento/peregrine/lib/context/app'
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import {isProductGiftCard} from '../util/isProductGiftCard'
import ADD_GIFTCARD_MUTATION from '../queries/addGiftCardProductsToCart.graphql'

const getGiftCardPrice = (product, giftCardAmount) => {
    const isGiftCard = isProductGiftCard(product)
    if(!isGiftCard || !giftCardAmount) return 0;

    try {
        const amount = product.giftcard_options.amount 
        const seletedAmount = amount.find(amountItem => amountItem.id === giftCardAmount)
        if(seletedAmount) {
            return seletedAmount.price
        } else if (giftCardAmount && !isNaN(parseFloat(giftCardAmount))) {
            return giftCardAmount
        }

        return 0
    } catch (e) {
        console.log(e)
    }
}

const getGiftCardGallery = (product, giftCardTemplate, giftCardTemplateImage) => {
    const isGiftCard = isProductGiftCard(product) 
    if(!isGiftCard || !giftCardTemplate || !giftCardTemplateImage) return null;

    try {
        const template = product.giftcard_options.template
        const selectedGiftCard = template.find(templateItem => templateItem.template_id === giftCardTemplate)
        if(selectedGiftCard && selectedGiftCard.images) {
            const selectedImage = selectedGiftCard.images.find(image => image.id === giftCardTemplateImage)
            selectedImage.disabled = false
            return selectedImage
        } 

        return null
    } catch (e) {
        console.log(e)
    }
}

const requiredField = [
    'bss_giftcard_amount',
    'bss_giftcard_template',
    'bss_giftcard_sender_name',
    'bss_giftcard_recipient_name',
];

const emailField = [
    'bss_giftcard_sender_email',
    'bss_giftcard_recipient_email'
]

const validateErrorGiftCardInfo = (product) => {
    const {giftcard_options} = product  
    let dynamicPrice = null
    if(giftcard_options) dynamicPrice = giftcard_options.dynamic_price
    if(giftcard_options && giftcard_options.type !== 2) {
        requiredField.push('bss_giftcard_sender_email')
        requiredField.push('bss_giftcard_recipient_email')
    } else {
        window.bbsGiftCardInfo.bss_giftcard_sender_email = ""
        window.bbsGiftCardInfo.bss_giftcard_recipient_email = ""
    }
    const error = {}
    requiredField.forEach((field) => {
        if(window.bbsGiftCardInfo && window.bbsGiftCardInfo['bss_giftcard_amount'] === 'custom') {
            if(!window.bbsGiftCardInfo['bss_giftcard_amount_dynamic']) {
                error['bss_giftcard_amount_dynamic'] = 'This is a required field.'
            } else if(dynamicPrice && window.bbsGiftCardInfo['bss_giftcard_amount_dynamic']) {
                if(window.bbsGiftCardInfo['bss_giftcard_amount_dynamic'] > dynamicPrice.max_value) {
                    error['bss_giftcard_amount_dynamic'] = `Please enter a value less than or equal to ${dynamicPrice.max_value}.`
                } else if(window.bbsGiftCardInfo['bss_giftcard_amount_dynamic'] < dynamicPrice.min_value) {
                    error['bss_giftcard_amount_dynamic'] = `Please enter a value greater than or equal to ${dynamicPrice.min_value}.`
                }
            }
        }

        if(!window.bbsGiftCardInfo || !window.bbsGiftCardInfo[field]) {
            error[field] = 'This is a required field.'
        }
    })
    
    emailField.forEach(field => {
        if(requiredField[field] && !error[field] && !validateEmail(window.bbsGiftCardInfo[field])) {
            error[field] = 'Please enter a valid email address (Ex: johndoe@domain.com).'
        }
    })

    return error;
}


export const useProductGiftCard = props => {
    const {
        quantity, 
        mediaGalleryEntries, 
        product, 
        productDetails,
        createCartMutation,
        getCartDetailsQuery
    } = props

    const addGiftCardProductsToCartMutation = ADD_GIFTCARD_MUTATION

    const apolloClient = useApolloClient()

    const [, { toggleDrawer }] = useAppContext();
    const [{ cartId }, { getCartDetails }] = useCartContext();

    const [addGiftCardProductsToCart] = useMutation(
        addGiftCardProductsToCartMutation
    );

    const [fetchCartId] = useMutation(createCartMutation);

    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const [errorGiftCartInfo, setErrorGiftCardInfo] = useState({})
    const [giftCardAmount, setGiftCardAmount] = useState("");

    const handleSetGiftCardAmount = useCallback(
        value => {
            setGiftCardAmount(value)
        },
        [setGiftCardAmount]
    );

    const giftCardPrice = useMemo(
        () => getGiftCardPrice(product, giftCardAmount), 
        [product, giftCardAmount]
    )

    const [giftCardTemplate, setGiftCardTemplate] = useState("");
    const [giftCardTemplateImage, setGiftCardTemplateImage] = useState("");

    const handleSetGiftCardTemplate = useCallback(
        value => {
            setGiftCardTemplate(value)
        },
        [setGiftCardTemplate]
    )

    const handleSetGiftCardTemplateImage = useCallback(
        value => {
            setGiftCardTemplateImage(value)
        },
        [setGiftCardTemplateImage]
    );

    const giftCardGallery = useMemo(
        () => getGiftCardGallery(product, giftCardTemplate, giftCardTemplateImage),
        [product, giftCardTemplate, giftCardTemplateImage]
    )

    if(giftCardGallery && mediaGalleryEntries && mediaGalleryEntries.length && mediaGalleryEntries.length > 0 ) {
        mediaGalleryEntries[0] = giftCardGallery
    } 

    productDetails.price = useMemo(() => {
        const price = {...productDetails.price}
        price.value = price.value + giftCardPrice
        return price
    }, [giftCardPrice, productDetails])
    

    const handleAddProductGiftCartToCart = useCallback(() => {
        const variables = {
            cartId,
            quantity,
            sku: product.sku,
        }

        const error = validateErrorGiftCardInfo(product)

        if(Object.keys(error).length === 0 && error.constructor === Object) {
            variables.giftcard_options = window.bbsGiftCardInfo   
        } else {
            setErrorGiftCardInfo(error)
            return;
        }
        
        addGiftCardProductsToCart({variables})
            .then(
                (res) => {
                    getCartDetails({apolloClient, fetchCartId, fetchCartDetails})
                    toggleDrawer('cart');
                }
                
            ).catch(error => {
                console.log(error)
            })
    }, [
        cartId,
        product,
        // getCartDetails,
        addGiftCardProductsToCart,
        toggleDrawer,
        // fetchCartDetails,
        // fetchCartId,
        quantity,
    ]) 

    return {
        errorGiftCartInfo,
        giftCardTemplate,
        giftCardTemplateImage,
        giftCardAmount,
        giftCardPrice,
        isProductGiftCart: isProductGiftCard(product),
        handleAddProductGiftCartToCart,
        handleSetGiftCardTemplate,
        handleSetGiftCardTemplateImage,
        handleSetGiftCardAmount,

    };
}