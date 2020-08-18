import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './ProductGiftCardOptions.css';
import {isProductGiftCard} from '@simicart/simi-giftcard/util/isProductGiftCard'
import CardValues from './cardValue'
import Template from './template'
import GiftCardTextInput from './components/giftCardTextInput'
import GiftCardTextArea from './components/giftCardTextArea'
import GiftCardDatePicker from './components/giftCardDatePicker'
import TimeZone from './timeZone'
import Button from '@magento/venia-ui/lib/components/Button';

const ProductGiftCardOptions = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        product,
        currencyCode,
        giftCardProps
    } = props

    if(!isProductGiftCard(product) || !product.giftcard_options) return null

    const giftcardOpitons = product.giftcard_options;

    const {
        amount,
        template,
        message,
        type,
        dynamic_price
    } = giftcardOpitons

    const {
        giftCardAmount,
        errorGiftCartInfo,
        giftCardTemplate,
        handleSetGiftCardAmount,
        handleSetGiftCardTemplate,
        giftCardTemplateImage,
        handleSetGiftCardTemplateImage
    } = giftCardProps

    return (
        <div className={classes.griftCard}>
            <CardValues 
                classes={classes} 
                amount={amount} 
                dynamicPrice={dynamic_price}
                currencyCode={currencyCode} 
                onSetGiftCardAmount={handleSetGiftCardAmount} 
                giftCardAmount={giftCardAmount}
                errorGiftCartInfo={errorGiftCartInfo}
            />
            <Template 
                classes={classes} 
                template={template} 
                onSetGiftCardTemplate={handleSetGiftCardTemplate}
                onSetGiftCardTemplateImage={handleSetGiftCardTemplateImage} 
                giftCardTemplate={giftCardTemplate}
                giftCardTemplateImage={giftCardTemplateImage}
                errorGiftCartInfo={errorGiftCartInfo}
            />
            <GiftCardTextInput name="bss_giftcard_sender_name" title="Sender Name" isRequired={true} classes={classes} errorGiftCartInfo={errorGiftCartInfo}/>
            <GiftCardTextInput name="bss_giftcard_recipient_name" title="Recipient Name" isRequired={true} classes={classes} errorGiftCartInfo={errorGiftCartInfo}/>
            {(type === 1 || type === 3) && <GiftCardTextInput name="bss_giftcard_sender_email" title="Sender Email" isRequired={true} classes={classes} errorGiftCartInfo={errorGiftCartInfo} />}
            {(type === 1 || type === 3) && <GiftCardTextInput name="bss_giftcard_recipient_email" title="Recipient Email" isRequired={true} classes={classes} errorGiftCartInfo={errorGiftCartInfo}/>}
            {message === 1 && <GiftCardTextArea name="bss_giftcard_message_email" title="Message" isRequired={false} classes={classes} />}
            {(type === 1 || type === 3) && <GiftCardDatePicker name="bss_giftcard_delivery_date" title="Delivery Date" isRequired={false} classes={classes} useCalendar={true}/>}
            {(type === 1 || type === 3) && <TimeZone classes={classes}/>}
            <div className={classes.buttonReview}>
                <Button>Review</Button>
            </div>
        </div>
    
    );
    
}

export default ProductGiftCardOptions;