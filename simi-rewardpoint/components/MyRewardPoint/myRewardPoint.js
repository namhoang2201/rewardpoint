import React, { useEffect } from 'react';
import { Title } from '@magento/venia-ui/lib/components/Head';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { getCustomerQuery } from './getCustomerPoint.gql';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import { useHistory } from 'react-router-dom';
import { Price } from '@magento/peregrine';
import PointTransactions from './PointTransactions';
import { useCustomerPoint } from '../../talons/useCustomerPoint';
require('./myRewardPoint.scss');

const MyRewardPoint = props => {
    const [{ isSignedIn }] = useUserContext();
    const history = useHistory();
    if (!isSignedIn) history.push('/');
    const { currencyCode } = useMiniCart();

    useEffect(() => {
        if (!isSignedIn) history.push('/');
    }, [isSignedIn, history]);

    const talonProps = useCustomerPoint({
        queries: { getCustomerQuery: getCustomerQuery }
    });

    const {
        data,
        loading,
        error,
        balance,
        point_earned,
        point_spent,
        exchange_rate
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
            <Title>{`My Rewards`}</Title>
            <div className="my-rewards">
                <div className="title">
                    <h1>My Rewards</h1>
                </div>
                <div className="content">
                    <div className="wrap">
                        <div className="subtitle">Balance Information</div>
                        <div className="subcontent">
                            <p className="rw-point">
                                <span>Points balance:</span>{' '}
                                <span className="color">{balance}</span>
                            </p>
                            <p className="rw-point">
                                <span>Total earned:</span>{' '}
                                <span className="color">{point_earned}</span>
                            </p>
                            <p className="rw-point">
                                <span>Total spent:</span>{' '}
                                <span className="color">{point_spent}</span>
                            </p>
                        </div>
                    </div>
                    <div className="wrap">
                        <div className="subtitle">Exchange Rate</div>
                        <div className="subcontent">
                            <p className="rw-point">
                                <span>
                                    {exchange_rate} point(s) can be redeemed for{' '}
                                </span>{' '}
                                <span className="color">
                                    <Price
                                        value={1}
                                        currencyCode={currencyCode}
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="wrap">
                        <div className="subtitle">
                            <span>TRANSACTIONS</span>
                            <span
                                className="view-all"
                                role="presentation"
                                onClick={() => history.push('/transactions')}
                            >
                                View all
                            </span>
                        </div>
                        <div className="subcontent">
                            <div className="rw-point">
                                <PointTransactions
                                    email={data.customer.email}
                                    showAll={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MyRewardPoint;
