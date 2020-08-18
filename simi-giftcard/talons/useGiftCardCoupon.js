import { useState, useCallback } from 'react'
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import {checkGiftCardCode, applyGiftCardCode} from '../request/giftCardOptions'

export const useGiftCardCoupon = props => {
    const [ {cartId}, ] = useCartContext()

    const [{isSignedIn}, ] = useUserContext()

    const [couponCode, setCouponCode] = useState('')

    const [error, setError] = useState(null)

    const [codeInfo, setCodeInfo] = useState(null)

    const handleSetCouponCode = useCallback(
        value => {
            setCouponCode(value)
        },
        [setCouponCode]
    )

    const handleSetError = useCallback(
        value => {
            setError(value)
        },
        setError
    )

    const handleSetCodeInfo = useCallback(
        value => {
            setCodeInfo(value)
        },
        [setCodeInfo]
    )

    const callBackCheckCode = useCallback((data) => {
        if(data && data.status) {
            handleSetCodeInfo(data)
        }
    }, [])

    const handleCheckCode = useCallback(
        () => {
            if(!couponCode) {
                setError("This field is required!")
            } else {
                checkGiftCardCode(callBackCheckCode, couponCode)
            }
        },
        [callBackCheckCode, couponCode]
    )

    const callBackApplyCode = useCallback(
        data => {
            console.log(data)
        }
    )

    const handleApplyCode = useCallback(
        () => {
            applyGiftCardCode(callBackApplyCode, isSignedIn, cartId, couponCode)
        },
        [cartId, couponCode, callBackApplyCode]
    )

    return {
        couponCode,
        codeInfo,
        error,
        handleCheckCode,
        handleSetCouponCode,
        handleSetError,
        handleApplyCode
    }
}