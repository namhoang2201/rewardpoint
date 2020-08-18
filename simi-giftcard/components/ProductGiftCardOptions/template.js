import React, { useMemo } from 'react';
import defaultClasses from './template.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import {saveGiftCardInfo} from '../../util/saveGiftCardInfo'
import Select from '@magento/venia-ui/lib/components/Select'
import Image from '@magento/venia-ui/lib/components/Image'

const Template = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        template, 
        onSetGiftCardTemplate,
        onSetGiftCardTemplateImage,
        giftCardTemplate,
        giftCardTemplateImage,
        errorGiftCartInfo
    } = props

    const handleSelectTemplate = (value) => {
        const praseIntValue = parseInt(value);
        onSetGiftCardTemplate(praseIntValue)
        saveGiftCardInfo("bss_giftcard_template", praseIntValue)
        const templateSelected = template.find(templateItem => templateItem.template_id === praseIntValue)
        if(templateSelected && templateSelected.images && templateSelected.images.length && templateSelected.images.length > 0) {
            onSetGiftCardTemplateImage(templateSelected.images[0].id)
            saveGiftCardInfo("bss_giftcard_selected_image", templateSelected.images[0].id)
        }
    }

    const handleSelectImage = (imageId) => {
        onSetGiftCardTemplateImage(imageId)
        saveGiftCardInfo('bss_giftcard_selected_image', imageId)
    }

    const templateValue = useMemo(() => {
        const arrTemplate = template.map((value, index) => {
            if(value.status !== 1) return null
            return {
                key: index+1,
                value: value.template_id,
                label: value.name
            }
        })

        arrTemplate.unshift({
            key: 0,
            value: "",
            label: "Choose an Template...", 
        })

        return arrTemplate;
    }, [template]) 

    const images = useMemo(() => {
        const templateSelected = template.find(templateItem => templateItem.template_id === giftCardTemplate)
        if(templateSelected) {
            const imagesRender = templateSelected.images.map((image, index) => {
                const isActive = image.id === giftCardTemplateImage ? classes.imageActive : ''
                return (
                    <div key={index} className={`${classes.imageWrapper} ${isActive}`} onClick={() => handleSelectImage(image.id)}>
                        <Image className={classes.imageItem} src={image.thumbnail} alt={image.alt || templateSelected.name} key={index}/>
                    </div>
                )
            })

            return (
                <div className={classes.images}>{imagesRender}</div>
            )
    
        }
        
        return null;
    }, [
        template, 
        giftCardTemplate, 
        giftCardTemplateImage, 
        onSetGiftCardTemplateImage,
    ])

    const fieldState = {value: giftCardTemplate}
    const style = {}
    if(errorGiftCartInfo && errorGiftCartInfo.bss_giftcard_template) {
        fieldState.error = errorGiftCartInfo.bss_giftcard_template
        style.border = '1px solid rgb(192, 18, 63)'
    }

    return (
        <div className={classes.section}>
            <label htmlFor="bss_giftcard_template" className={classes.title}>Template <span className={classes.required}>*</span></label>
            <div className={classes.selectInput}>   
                <Select 
                    field="bss_giftcard_template" 
                    items={templateValue}    
                    onValueChange={value => handleSelectTemplate(value)}
                    fieldState={fieldState}
                    style={style}
                />
            </div>
            {images}
        </div>
    );
}

export default Template;