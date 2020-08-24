import React from 'react';
import { BSS_STORE_CONFIG_QUERY } from './bssRewardPointsStoreConfig.gql.js';
import {
    getDataFromStoreage,
    storeDataToStoreage
} from '@simicart/simi-module/util/storeData';
import { useStoreConfig } from '../../talons/useStoreConfig';

const GetBssConfig = props => {
    const talonProps = useStoreConfig({
        queries: { bssRewardPointsStoreConfigQuery: BSS_STORE_CONFIG_QUERY },
        variables: { variables: { storeview: 1 } }
    });

    const { data } = talonProps;

    const storeConfig = getDataFromStoreage('SESSION_STOREAGE', 'STORE_CONFIG');

    if (!storeConfig && data) {
        storeDataToStoreage('SESSION_STOREAGE', 'STORE_CONFIG', data);
    }

    return <></>;
};

export default GetBssConfig;
