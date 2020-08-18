import React, {useMemo, useState} from 'react';
import {saveGiftCardInfo} from '../../../util/saveGiftCardInfo'
import TextInput from '@magento/venia-ui/lib/components/TextInput'

const GiftCardTextInput = props => {
    const {
        classes,
        title,
        name,
        isRequired,
        errorGiftCartInfo
    } = props

    const [inputValue, setInputValue] = useState("")

    const handleOnChange = (value) => {
        // const handleValue = inputValue + value
        setInputValue(value)
        saveGiftCardInfo(name, value)
    }

    const requireLabel = useMemo(() => 
        isRequired ? <span className={classes.required}>*</span> : '',
        [classes, isRequired]
    )
    
    const fieldState = {value: inputValue, maskedValue: inputValue}
    const style = {}
    if(isRequired && errorGiftCartInfo && errorGiftCartInfo[name]) {
        fieldState.error = errorGiftCartInfo[name]
        style.border = '1px solid rgb(192, 18, 63)'
    } 

    return (
        <div className={classes.section}>
            <label htmlFor={name} className={classes.title}>{title} {requireLabel}</label>
            <TextInput 
                field={name}
                onValueChange={(value) => handleOnChange(value)}
                fieldState={fieldState}
                style={style}
            />
        </div>
    );
    
}

export default GiftCardTextInput;