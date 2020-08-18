import { sendRequest } from '@simicart/simi-module/connect'

export const checkGiftCardCode = (callBack, code) => {
    sendRequest('rest/V1/bssGiftCard/checkCode', callBack, 'POST',{}, {code})
}

export const applyGiftCardCode = (callBack, isSingIn, cartId, giftCardCode) => {
    let uri = `rest/V1/bssGiftCard/apply/${cartId}/${giftCardCode}`
    if(isSingIn) {
        uri = `rest/V1/bssGiftCard/mine/apply/${giftCardCode}`
    }

    sendRequest(uri, callBack, 'PUT', {}, {})
}