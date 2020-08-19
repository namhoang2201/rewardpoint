import React, { useEffect } from 'react';
import { Title } from '@magento/venia-ui/lib/components/Head';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { getCustomerQuery } from '../getCustomerPoint.gql';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useHistory } from 'react-router-dom';
import { useCustomerPoint } from '../../../talons/useCustomerPoint';
import PointTransactions from './index';

require('./allPointTransaction.scss');

const AllPointTransactions = props => {
    const [{ isSignedIn }] = useUserContext();

    const history = useHistory();

    if (!isSignedIn) history.push('/');

    useEffect(() => {
        if (!isSignedIn) history.push('/');
    }, [isSignedIn, history]);

    const talonProps = useCustomerPoint({
        queries: { getCustomerQuery: getCustomerQuery }
    });

    const {
        data,
        loading,
        error
    } = talonProps;

    if (loading) {
        return <LoadingIndicator>{'Fetching Data ...'}</LoadingIndicator>;
    }
    if (error) {
        window.location.reload();
        return <div>Data Fetch Error</div>;
    }

    return (
        <React.Fragment>
            <Title>{`Transactions`}</Title>
            <div className="my-rewards">
                <div className="title">
                    <h1>Transactions</h1>
                    <div
                        role="presentation"
                        className="back"
                        onClick={() => history.goBack()}
                    >
                        Back
                    </div>
                </div>
                <div className="content">
                    <div className="wrap">
                        <div className="subcontent">
                            <div className="rw-point">
                                <PointTransactions
                                    email={data.customer.email}
                                    showAll={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AllPointTransactions;
