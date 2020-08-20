import React from 'react';
import { GET_PRODUCT_DETAIL_CUSTOM } from './getProductDetailCustom.gql';
import { useProductDetailCustom } from '../../talons/useProductDetailCustom';

const PointMessage = props => {
    const { url_key, type } = props;

    const talonProps = useProductDetailCustom({
        queries: { query: GET_PRODUCT_DETAIL_CUSTOM },
        urlKey: { urlKey: url_key }
    });

    const { reward_point } = talonProps;

    console.log(props);
    if (type === 'submit_review') {
        return <>Message Earn Point Submit Review</>;
    }
    if (type === 'product_config') {
        return <>Message Earn Point Product Config</>;
    }
    return <>Message Earn Point</>;
};

export default PointMessage;
