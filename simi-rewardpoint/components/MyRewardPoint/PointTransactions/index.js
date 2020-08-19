import React, { useState } from 'react';
import { getBssRewardPointsTransactions } from './bssRewardPointsTransactions.gql.js';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import PaginationTable from './PaginationTable';
import { Link } from 'react-router-dom';
import { usePointTransaction } from '../../../talons/usePointTransaction';

const Transactions = props => {
    const [limit, setLimit] = useState(10);

    const scrollTop = () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    };

    const cols = [
        { title: 'Point', width: '1%' },
        { title: 'Balance', width: '1%' },
        { title: 'Note', width: '20%' },
        { title: 'Created By', width: '20%' },
        { title: 'Transaction type', width: '10%' },
        { title: 'Transaction date', width: '10%' },
        { title: 'Expiry date', width: '10%' },
        { title: 'Action', width: '10%' }
    ];

    const convertDate_1 = date_type => {
        const arr = date_type.split(/[- :]/);
        let date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        date = m + '/' + date.getDate() + '/' + date.getFullYear();
        return date;
    };

    const convertDate_2 = date_type => {
        const arr2 = date_type.split(/[- :]/);
        let date2 = new Date(
            arr2[0],
            arr2[1] - 1,
            arr2[2],
            arr2[3],
            arr2[4],
            arr2[5]
        );
        let m2 = date.getMonth() + 1;
        m2 = m2 < 10 ? '0' + m2 : m2;
        date2 = m2 + '/' + date2.getDate() + '/' + date2.getFullYear();
        return date2;
    };

    const renderOneTransaction = (item, index) => {
        const created_date = convertDate_1(item.created_at);
        const expiry_date = item.expires_at
            ? convertDate_2(item.expires_at)
            : 'N/A';

        const location = {
            pathname: '/transactionDetail/' + item.transaction_id
        };
        return (
            <tr key={index}>
                <td data-title={'Point'}>
                    <div className="inside">{item.point}</div>
                </td>
                <td data-title={'Balance'}>
                    <div className="inside">
                        {item && item.currentBalance ? item.currentBalance : 0}
                    </div>
                </td>
                <td data-title={'Note'}>
                    <div className="inside">{item.note}</div>
                </td>
                <td data-title={'Created by'}>
                    <div className="inside">{item.created_by}</div>
                </td>
                <td data-title={'Transaction type'}>
                    <div className="inside">type {item.action}</div>
                </td>
                <td data-title={'Transaction date'}>
                    <div className="inside">{created_date}</div>
                </td>
                <td data-title={'Expiry date'}>
                    <div className="inside">{expiry_date}</div>
                </td>
                <td data-title={'Action'}>
                    <div className="inside action">
                        <Link onClick={() => scrollTop()} to={location}>
                            View
                        </Link>
                    </div>
                </td>
            </tr>
        );
    };

    const talonProps = usePointTransaction({
        queries: {
            bssRewardPointsTransactionsQuery: getBssRewardPointsTransactions
        },
        customer: {email: props.email}
    });

    const { data, loading, error, listItems } = talonProps;

    if (loading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <div>Data Fetch Error</div>;
    }
    if (data && listItems) {
        return (
            <PaginationTable
                renderItem={renderOneTransaction}
                data={!props.showAll ? listItems.slice(0, 5) : listItems}
                itemCount={listItems.length}
                cols={cols}
                showPageNumber={props.showAll ? true : false}
                limit={typeof limit === 'string' ? parseInt(limit) : limit}
                setLimit={setLimit}
                currentPage={1}
            />
        );
    }
    return <>You have no transactions !</>;
};

export default Transactions;
