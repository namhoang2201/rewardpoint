import React from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { ShoppingBag as ShoppingBagIcon } from 'react-feather';
import { useCustomerPoint } from '../../talons/useCustomerPoint';
import { getCustomerQuery } from '../MyRewardPoint/getCustomerPoint.gql';
require('./pointHeader.scss');

const PointHeader = props => {
    const { leftMenu } = props;
    const [{ isSignedIn }] = useUserContext();

    if (!isSignedIn)
        return (
            <Link to={resourceUrl('/cart')}>
                <ShoppingBagIcon size={18} />
            </Link>
        );

    const talonProps = useCustomerPoint({
        queries: { getCustomerQuery: getCustomerQuery }
    });

    const { data, loading, error, balance } = talonProps;

    if (loading) {
        return '';
    }
    if (error) {
        return '';
    }

    if (leftMenu) return <>({balance} Points)</>;

    return (
        <span className="header-point">
            <span className="icon" />
            <span className="title">You have {balance} Points</span>
        </span>
    );
};

export default PointHeader;
