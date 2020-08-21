import React, { useEffect } from 'react';
import { Title } from '@magento/venia-ui/lib/components/Head';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { getCustomerQuery } from './getCustomerPoint.gql';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';
import { useHistory } from 'react-router-dom';
import { Price } from '@magento/peregrine';
import PointTransactions from './PointTransactions';
import { useNotifyRP } from '../../talons/useNotifyRP';
import { updateNotifyMutation } from './updateNotifyMutation.gql.js';
import RadioCheckbox from '../BaseComponents/RadioCheckbox/index';
import {
    AlertCircle as AlertCircleIcon,
    Smile as SuccessIcon
} from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import $ from 'jquery';
const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;
const successIcon = <Icon src={SuccessIcon} attrs={{ width: 18 }} />;
require('./myRewardPoint.scss');

const MyRewardPoint = props => {
    const [{ isSignedIn }] = useUserContext();
    const history = useHistory();
    if (!isSignedIn) history.push('/');
    const { currencyCode } = useMiniCart();

    useEffect(() => {
        if (!isSignedIn) history.push('/');
    }, [isSignedIn, history]);

    const talonProps = useNotifyRP({
        mutations: { updateNotifyMutation: updateNotifyMutation },
        queries: { getNotifyStatusQuery: getCustomerQuery },
        icons: { successIcon: successIcon, errorIcon: errorIcon }
    });

    const {
        data,
        loading,
        error,
        balance,
        point_earned,
        point_spent,
        exchange_rate,
        notify_balance,
        notify_expiration,
        handleUpdateNotify
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
                                onClick={() =>
                                    history.push('/pointTransactions')
                                }
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
                    <div className="wrap">
                        <div className="subtitle">Notification</div>
                        <div className="subcontent">
                            <p className="rw-point rw-check">
                                <span>
                                    <RadioCheckbox
                                        defaultChecked={
                                            notify_balance === 1 ? true : false
                                        }
                                        id="checkbox-notify-balance"
                                        name="notify_balance_input"
                                    />
                                </span>{' '}
                                <span className="color">
                                    Notify when balance is updated
                                </span>
                            </p>
                            <p className="rw-point rw-check">
                                <span>
                                    <RadioCheckbox
                                        defaultChecked={
                                            notify_expiration === 1
                                                ? true
                                                : false
                                        }
                                        id="checkbox-notify-expiration"
                                        name="notify_expiration_input"
                                    />
                                </span>{' '}
                                <span className="color">
                                    Notify before expiration
                                </span>
                            </p>
                        </div>
                        <button
                            className="save"
                            onClick={() => {
                                const n_balance_int =
                                    $('#checkbox-notify-balance').is(
                                        ':checked'
                                    ) === true
                                        ? 1
                                        : 0;
                                const n_expire_int =
                                    $('#checkbox-notify-expiration').is(
                                        ':checked'
                                    ) === true
                                        ? 1
                                        : 0;
                                handleUpdateNotify(n_balance_int, n_expire_int);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MyRewardPoint;
