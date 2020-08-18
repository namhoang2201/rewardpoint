import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClass from './cartGiftCardOption.css'
import { Price } from '@magento/peregrine';
import Image from '@magento/venia-ui/lib/components/Image';

const CartGiftCardOptions = props => {
    const classes = mergeClasses(defaultClass, props.classes)
    const {item, currencyCode} = props
    if(!item || !item.giftcard_option) return null

    console.log(item)

    const {
        giftcard_value,
        giftcard_sender_name,
        giftcard_sender_email,
        giftcard_recipient_name,
        giftcard_recipient_email,
        giftcard_template_name,
        giftcard_image,
        giftcard_message,
        giftcard_timezone
    } = item.giftcard_option

    return (
        <div className={`${classes.root} ${classes.rootCartPage}`}>
            <div className={classes.listOption}>
                {giftcard_value && (
                    <div className={classes.item}>
                        <span className={classes.title}>Value: </span>
                        <span className={classes.value}><Price currencyCode={currencyCode} value={giftcard_value}/></span>
                    </div>
                )}
                {giftcard_sender_name && (
                    <div className={classes.item}>
                        <span className={classes.title}>Sender: </span>
                        <span className={classes.value}>{`${giftcard_sender_name} ${giftcard_sender_email ? `<${giftcard_sender_email}>` : ''}`} </span>
                    </div>
                )}
                {giftcard_recipient_name && (
                    <div className={classes.item}>
                        <span className={classes.title}>Recipient: </span>
                        <span className={classes.value}>{`${giftcard_recipient_name} ${giftcard_recipient_email ? `<${giftcard_recipient_email}>` : ''}`} </span>
                    </div>
                )}
                {giftcard_template_name && (
                    <div className={classes.item}>
                        <span className={classes.title}>Template: </span>
                        <span className={classes.value}>{giftcard_template_name}</span>
                    </div>
                )}
                {giftcard_image && giftcard_image.thumbnail && (
                    <div className={classes.item}>
                        <span className={classes.title}>Image: </span>
                        <span className={classes.value}>
                            <Image
                                src={giftcard_image.thumbnail}
                                className={classes.cartImageItem}
                                alt={(item.product && item.product.name) || ''}
                            />
                        </span>
                    </div>
                )}
                {giftcard_message && (
                    <div className={classes.item}>
                        <span className={classes.title}>Meassage: </span>
                        <span className={classes.value}>{giftcard_message}</span>
                    </div>
                )}
                {giftcard_timezone && (
                    <div className={classes.item}>
                        <span className={classes.title}>Timezone: </span>
                        <span className={classes.value}>{giftcard_timezone}</span>
                    </div>
                )}
            </div>
        </div>
    );

}

export default CartGiftCardOptions;