import React from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { ShoppingBag as ShoppingBagIcon } from 'react-feather';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useCustomerPoint } from '../../talons/useCustomerPoint';
import { getCustomerQuery } from '../MyRewardPoint/getCustomerPoint.gql';

const PointHeader = props => {
    const [{ isSignedIn }] = useUserContext();

    if(!isSignedIn) return(
        <Link to={resourceUrl('/cart')}>
            <ShoppingBagIcon size={18} />
        </Link>
    );

    const talonProps = useCustomerPoint({
        queries: { getCustomerQuery: getCustomerQuery }
    });

    const {
        data,
        loading,
        error,
        balance
    } = talonProps;

    if (loading) {
        return <LoadingIndicator></LoadingIndicator>;
    }
    if (error) {
        return '';
    }

return <React.Fragment>{balance} Points</React.Fragment>;
};

export default PointHeader;
