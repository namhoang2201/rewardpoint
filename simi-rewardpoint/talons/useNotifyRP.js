import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useCustomerPoint } from './useCustomerPoint';
import { useToasts } from '@magento/peregrine';

export const useNotifyRP = props => {
    const {
        mutations: { updateNotifyMutation },
        queries: { getNotifyStatusQuery },
        icons: { successIcon, errorIcon }
    } = props;

    const talonProps = useCustomerPoint({
        queries: { getCustomerQuery: getNotifyStatusQuery }
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
        notify_expiration
    } = talonProps;

    const [, { addToast }] = useToasts();

    const [updateNotification, { dataUpdate, errorUpdate }] = useMutation(
        updateNotifyMutation,
        {
            onCompleted: data => {
                if (data && data.updateNotify && data.updateNotify.status) {
                    const { message, success } = data.updateNotify.status;
                    if (success) {
                        addToast({
                            type: 'info',
                            icon: successIcon,
                            message: message,
                            timeout: 2000
                        });
                    }
                }
            },
            onError: error => {
                console.log(error);
                addToast({
                    type: 'error',
                    icon: errorIcon,
                    message: 'Something went wrong, please try again later !',
                    timeout: 3000
                });
            }
        }
    );

    const handleUpdateNotify = (statusBalance, statusExpire) => {
        updateNotification({
            variables: {
                notify_balance: statusBalance,
                notify_expiration: statusExpire
            }
        });
    };

    return {
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
    };
};
