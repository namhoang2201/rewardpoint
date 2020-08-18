import React, {useMemo, useState, useCallback} from 'react';
import Select from '@magento/venia-ui/lib/components/Select'
import TextInput from '@magento/venia-ui/lib/components/TextInput'
import { formatPrice } from '../../util/formatPrice';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './cardValue.css';
import {saveGiftCardInfo} from '../../util/saveGiftCardInfo'

const CardValue = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const [showOtherAmount, setShowOtherAmount] = useState(false) 
    const [dynamicAmount, setDynamicAmount] = useState('') 
    const {
        amount, 
        currencyCode,
        onSetGiftCardAmount,
        giftCardAmount,
        dynamicPrice,
        errorGiftCartInfo
    } = props;

    const cardValues = useMemo(() => {
        const arrCardValues = amount.map((value, index) => {
            const priceValue = formatPrice(value.value, currencyCode);
            return {
                key: index+1,
                value: value.id,
                label: priceValue
            }
        })

        arrCardValues.unshift({
            key: 0,
            value: "",
            label: "Choose an Amount", 
        })

        if(dynamicPrice && dynamicPrice.enable) {
            arrCardValues.push({
                key: amount.length + 2,
                value: "custom",
                label: "Other Amount"
            })
        }

        return arrCardValues;
    }, [amount, currencyCode, dynamicPrice]) 

    const handleOnChangeGiftCardAmount = useCallback((value) => {
        if(value === 'custom') {
            setShowOtherAmount(true)
            saveGiftCardInfo('bss_giftcard_amount', 'custom')
            const parseFloatValue = parseFloat(dynamicAmount)
            if(dynamicAmount && !isNaN(parseFloatValue)) 
                onSetGiftCardAmount(parseFloatValue)
            
        } else {
            if(showOtherAmount) setShowOtherAmount(false)
            const parseIntValue = parseFloat(value)
            saveGiftCardInfo('bss_giftcard_amount', parseIntValue)
            onSetGiftCardAmount(parseIntValue)
        }
    }, [onSetGiftCardAmount, dynamicAmount, showOtherAmount])

    const handleOnChangeDynamicAmount = useCallback((value) => {
        let parseFloatValue = parseFloat(value);
        setDynamicAmount(parseFloatValue)
        if(!isNaN(parseFloatValue)) {
            if(dynamicPrice.percentage_price_type) {
                parseFloatValue = (parseFloatValue*50)/100
            }
            onSetGiftCardAmount(parseFloatValue)
        }

        saveGiftCardInfo('bss_giftcard_amount_dynamic', parseFloatValue)
    }, [setDynamicAmount, onSetGiftCardAmount, dynamicPrice])

    const placeHoder = useMemo(() => {
        if(dynamicPrice && dynamicPrice.enable) {
            return `(${dynamicPrice.min_value}-${dynamicPrice.max_value})`;
        }

        return ''
    }, [dynamicPrice])

    const fieldState = {value: giftCardAmount}
    if(window.bbsGiftCardInfo && window.bbsGiftCardInfo.bss_giftcard_amount === 'custom') {
        fieldState.value = 'custom'
    }

    const styleDynamicAmount = {}
    const fieldStateDynamicAmount = {value: dynamicAmount, maskedValue: dynamicAmount}
    if(errorGiftCartInfo && errorGiftCartInfo.bss_giftcard_amount_dynamic) {
        fieldStateDynamicAmount.error = errorGiftCartInfo.bss_giftcard_amount_dynamic
        styleDynamicAmount.border = '1px solid rgb(192, 18, 63)'
    }

    const style = {}
    if(errorGiftCartInfo && errorGiftCartInfo.bss_giftcard_amount) {
        fieldState.error = errorGiftCartInfo.bss_giftcard_amount
        style.border = '1px solid rgb(192, 18, 63)'
    }
    
    return (
        <div className={classes.cardValues}>
            <label htmlFor="bss_giftcard_amount" className={classes.title}>Card Value <span className={classes.required}>*</span></label>
            <Select 
                items={cardValues} 
                field="bss_giftcard_amount"
                onValueChange={(value) => handleOnChangeGiftCardAmount(value)}
                fieldState={fieldState}
                style={style}
            />
            {
                showOtherAmount && 
                <div className={classes.amountDynamicInput}>
                    <TextInput 
                        field="bss_giftcard_amount_dynamic" 
                        placeholder={placeHoder}
                        fieldState={fieldStateDynamicAmount}
                        onValueChange={(value) => handleOnChangeDynamicAmount(value)}
                        style={styleDynamicAmount}
                    />
                </div>
            }
        </div> 
    );
    
}

export default CardValue;