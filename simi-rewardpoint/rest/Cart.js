import { sendRequest } from '@simicart/simi-module/connect';

export const getRestCart = (callBack, isSignedIn, cartId) => {
    if (isSignedIn) {
        sendRequest('/rest/V1/carts/mine/totals', callBack, 'GET');
    } else {
        sendRequest(`/rest/V1/carts/${cartId}/totals`, callBack, 'GET');
    }
};
