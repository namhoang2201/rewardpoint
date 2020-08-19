import { useQuery } from '@apollo/react-hooks';

export const usePointTransaction = props => {
    const {
        queries: { bssRewardPointsTransactionsQuery },
        customer: { email }
    } = props;

    const { data, loading, error } = useQuery(
        bssRewardPointsTransactionsQuery,
        {
            fetchPolicy: 'no-cache'
        }
    );

    let listItems = null;

    if (
        data &&
        data.hasOwnProperty('bssRewardPointsTransaction') &&
        data.bssRewardPointsTransaction.hasOwnProperty('items') &&
        Array.isArray(data.bssRewardPointsTransaction.items) &&
        data.bssRewardPointsTransaction.items.length
    ) {
        // filter all transaction by email
        listItems = data.bssRewardPointsTransaction.items.map(item => {
            if (item.created_by === email) {
                return item;
            }
            return null;
        });
        // calculate current balance point manually
        let lastBalance = 0;
        listItems = listItems.map(item => {
            lastBalance +=
                parseInt(item.point) - parseInt(item.point_expired);
            item.currentBalance = lastBalance;
            return item;
        });
        // sorting
        listItems = listItems.sort((a, b) => {
            return b.transaction_id - a.transaction_id;
        });
    }

    return {
        data,
        loading,
        error,
        listItems
    };
};
