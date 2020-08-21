import React from 'react';
import { GET_PRODUCT_DETAIL_CUSTOM } from './getProductDetailCustom.gql';
import { useProductDetailCustom } from '../../talons/useProductDetailCustom';
import { useUserContext } from '@magento/peregrine/lib/context/user';
require('./pointMessage.scss');

const PointMessage = props => {
    const { url_key, type } = props;

    const talonProps = useProductDetailCustom({
        queries: { query: GET_PRODUCT_DETAIL_CUSTOM },
        urlKey: { urlKey: url_key }
    });

    const { reward_point } = talonProps;

    const [{ isSignedIn }] = useUserContext();

    let messagePoint = null;
    if (type === 'submit_review') {
        if (
            reward_point &&
            reward_point.hasOwnProperty('customer_point') &&
            reward_point.customer_point.hasOwnProperty('review_point') &&
            reward_point.customer_point.hasOwnProperty('message')
        ) {
            if (!isSignedIn) {
                messagePoint = reward_point.customer_point.message;
            } else {
                messagePoint =
                    'Earn ' +
                    reward_point.customer_point.review_point +
                    ' points for each review';
            }
        }
    }
    if (type === 'product_config') {
        if (
            reward_point &&
            reward_point.hasOwnProperty('product_point') &&
            reward_point.product_point.hasOwnProperty('assign_by') &&
            reward_point.product_point.hasOwnProperty('dependent_qty') &&
            reward_point.product_point.hasOwnProperty('point') &&
            reward_point.product_point.hasOwnProperty('message')
        ) {
            // exchange rate (assign_by = 1) or fix amount (assy_by =2)
            if (!isSignedIn) {
                messagePoint = reward_point.product_point.message;
            } else {
                messagePoint =
                    'Earn ' +
                    reward_point.product_point.point +
                    ' points for 1 product item';
            }
            // no point (assy_by = 0) => no message
        }
    }
    return (
        messagePoint ? <div className="point-message">
            <span className="icon" />
            <span className="title">{messagePoint}</span>
        </div> : ''
    );
};

export default PointMessage;
