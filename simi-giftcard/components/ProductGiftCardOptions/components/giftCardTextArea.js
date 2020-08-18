import React, {useCallback} from 'react';
import {saveGiftCardInfo} from '../../../util/saveGiftCardInfo'
import TextArea from '@magento/venia-ui/lib/components/TextArea'

const GiftCardTextInput = props => {
    const {
        classes,
        title,
        name,
    } = props

    const handleOnChange = useCallback(
        (value) => {
            saveGiftCardInfo(name, value)
        },
        [name]
    )
    
    return (
        <div className={classes.section}>
            <label htmlFor={name} className={classes.title}>{title}</label>
            <TextArea 
                field={name}
                onValueChange={(value) => handleOnChange(value)}
            />
        </div>
    );
    
}

export default GiftCardTextInput;