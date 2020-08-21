import React, { useEffect } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { getCustomerQuery } from './getCustomerPoint.gql.js';

const RefreshPointCheckoutPage = props => {
    const [, { getUserDetails }] = useUserContext();
    const fetchUserDetails = useAwaitQuery(getCustomerQuery);

    // request data from server to update customer balance point on header
    useEffect(() => {
        getUserDetails({ fetchUserDetails });
    }, []);

    // return nothing
    return <></>;
};

export default RefreshPointCheckoutPage;
