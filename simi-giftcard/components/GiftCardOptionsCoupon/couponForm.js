import React, {useMemo} from 'react';
import defaultClasses from './couponForm.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Form } from 'informed';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Button from '@magento/venia-ui/lib/components/Button'

import {useGiftCardCoupon} from '../../talons/useGiftCardCoupon'

const CouponForm = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        error,
        couponCode,
        onCheckCode,
        onSetCouponCode,
        onApplyCode
    } = props
    
    const fieldState = useMemo(() => {
        const state = {value: couponCode, maskedValue: couponCode}
        if(error) {
            state.error = error
        }
        
        return state
    }, [couponCode, error])

    return (
        <Form className={classes.entryForm}>
            <Field id="bss_giftcard_code">
                <TextInput
                    placeholder={'Enter Gift Code'}
                    field="bss_giftcard_code"
                    onValueChange={(value) => onSetCouponCode(value)}
                    fieldState={fieldState}
                />
            </Field>
            <Field>
                <Button
                    priority={'normal'}
                    type={'submit'}
                    onClick={onApplyCode}
                >
                    {'Apply'}
                </Button>
            </Field>
            <Field>
                <Button
                    priority={'normal'}
                    type={'button'}
                    onClick={onCheckCode}
                >
                    {'Check Status'}
                </Button>
            </Field>
        </Form>
    );
}

export default CouponForm;