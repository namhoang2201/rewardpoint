import React from 'react';
import Header from '@magento/venia-ui/lib/components/Header';
import Footer from '@magento/venia-ui/lib/components/Footer';
import { BSS_STORE_CONFIG_QUERY } from './bssRewardPointsStoreConfig.gql.js';
import {
    getDataFromStoreage,
    storeDataToStoreage
} from '@simicart/simi-module/util/storeData';
import { useStoreConfig } from '../../talons/useStoreConfig';

const CustomMain = props => {
    const talonProps = useStoreConfig({
        queries: { bssRewardPointsStoreConfigQuery: BSS_STORE_CONFIG_QUERY },
        variables: { variables: { storeview: 1 } }
    });

    const { data } = talonProps;

    const storeConfig = getDataFromStoreage('SESSION_STOREAGE', 'STORE_CONFIG');

    if (storeConfig) {
        return (
            <main className={props.rootClass}>
                <Header />
                <div className={props.pageClass}>{props.children}</div>
                <Footer />
            </main>
        );
    }

    if (data) {
        storeDataToStoreage('SESSION_STOREAGE', 'STORE_CONFIG', data);
    }

    return (
        <main className={props.rootClass}>
            <Header />
            <div className={props.pageClass}>{props.children}</div>
            <Footer />
        </main>
    );
};

export default CustomMain;
