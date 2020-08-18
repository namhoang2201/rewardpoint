import {useCallBack, useCallback} from 'react'
import { useCartContext } from '@magento/peregrine/lib/context/cart';

export const useGiftCardCheckOut = props => {
    const [{cart}, ] = useCartContext()

    const checkGiftCartVitrualType = useCallback(() => {
        console.log(cart)
        if(cart && cart.detail && cart.detail.items) {
            const cartItems = cart.detail.items
            cartItems.forEach(item => {
                if(item.giftcard_option && item.giftcard_option.giftcard_recipient_email)
            })
        }
    }, )
} 