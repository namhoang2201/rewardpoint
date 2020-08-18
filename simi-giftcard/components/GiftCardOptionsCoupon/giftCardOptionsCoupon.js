import React from 'react'
import { Section } from '@magento/venia-ui/lib/components/Accordion';
import CouponForm from './couponForm'
import CouponInfon from './couponInfo'

import {useGiftCardCoupon} from '../../talons/useGiftCardCoupon'

const GiftCardOptionsCoupon = props => {

    const giftCartProp = useGiftCardCoupon({})

    const {
        couponCode,
        codeInfo,
        error,
        handleCheckCode,
        handleSetCouponCode,
        handleApplyCode

    } = giftCartProp

    console.log(codeInfo)

    return (
        <Section id={'bss_giftcard_options'} title={"Gift Card Options"}>
            <CouponInfon 
                codeInfo={codeInfo}
            />
            <CouponForm
                error={error}
                couponCode={couponCode}
                onSetCouponCode={handleSetCouponCode}
                onCheckCode={handleCheckCode}
                onApplyCode={handleApplyCode}
            />
        </Section>
    )
}

export default GiftCardOptionsCoupon