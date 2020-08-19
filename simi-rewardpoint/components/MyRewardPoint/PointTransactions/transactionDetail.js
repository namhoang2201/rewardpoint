import React, { useEffect } from 'react';
import { Title } from '@magento/venia-ui/lib/components/Head';
import { useHistory } from 'react-router-dom';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { usePointTransaction } from '../../../talons/usePointTransaction';
import { getBssRewardPointsTransactions } from './bssRewardPointsTransactions.gql.js';

const PointTransactionDetail = props => {
    const [{ isSignedIn }] = useUserContext();

    const history = useHistory();

    if (!isSignedIn) history.push('/');

    useEffect(() => {
        if (!isSignedIn) history.push('/');
    }, [isSignedIn, history]);
    const arrayResource = window.location.pathname.split('/');
    const transaction_id = arrayResource[2];

    const talonProps = usePointTransaction({
        queries: {
            bssRewardPointsTransactionsQuery: getBssRewardPointsTransactions
        },
        customer: { email: null }
    });

    const { data, loading, error, listItems } = talonProps;

    if (loading) {
        return <LoadingIndicator>{'Fetching Data ...'}</LoadingIndicator>;
    }
    if (error) {
        window.location.reload();
        return <div>Data Fetch Error</div>;
    }
    if (
        data && listItems
    ) {
        const result = listItems.find(
            item => item.transaction_id + '' === transaction_id
        );
        if (result) {
            return (
                <React.Fragment>
                    <Title>{`Transaction`}</Title>
                    <div className="my-rewards">
                        <div className="title">
                            <h1>Transaction Detail</h1>
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
                                <div className="rw-point">
                                    <span>Point:</span>{' '}
                                    <span className="color">
                                        {result.point}
                                    </span>
                                </div>
                                <div className="rw-point">
                                    <span>Note:</span>{' '}
                                    <span className="color">{result.note}</span>
                                </div>
                                <div className="rw-point">
                                    <span>Created by:</span>{' '}
                                    <span className="color">
                                        {result.created_by}
                                    </span>
                                </div>
                                <div className="rw-point">
                                    <span>Transaction type:</span>{' '}
                                    <span className="color">
                                        type {result.action}
                                    </span>
                                </div>
                                <div className="rw-point">
                                    <span>Transaction date:</span>{' '}
                                    <span className="color">
                                        {result.created_at}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return (
            <>
                <div className="title">
                    <h1>404</h1>
                </div>
                <div className="content">Reource Not Found !</div>
            </>
        );
    }
};

export default PointTransactionDetail;
