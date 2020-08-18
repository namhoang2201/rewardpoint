import React, {useCallback} from 'react';
import {saveGiftCardInfo} from '../../util/saveGiftCardInfo'
import defaultClasses from './template.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Select from '@magento/venia-ui/lib/components/Select'


const Template = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const items = [
        {
            key: 0,
            value: "",
            label: "Choose an Timezone..."
        },
        {
            key: 1,
            value: "America/Eirunepe",
            label: "Acre Standard Time (America/Eirunepe)"
        },
        {
            key: 2,
            value: "America/Rio_Branco",
            label: "Acre Standard Time (America/Rio_Branco)"
        },
    ]

    const handleSelectTimeZone = useCallback(
        (value) => {
            saveGiftCardInfo('bss_giftcard_timezone', value)
        },
        []
    )

    return (
        <div className={classes.section}>
            <label htmlFor="bss_giftcard_timezone" className={classes.title}>Select Timezone</label>
            <div className={classes.selectInput}>   
                <Select 
                    field="bss_giftcard_timezone" 
                    items={items}    
                    onValueChange={value => handleSelectTimeZone(value)}
                />
            </div>
        </div>
    );
}

export default Template;