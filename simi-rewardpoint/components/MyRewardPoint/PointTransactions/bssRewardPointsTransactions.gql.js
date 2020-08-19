import gql from 'graphql-tag';

export const getBssRewardPointsTransactions = gql`
    query getBssRewardPointsTransaction {
        bssRewardPointsTransaction {
            items {
                transaction_id
                website_id
                customer_id
                point
                point_used
                point_expired
                amount
                base_currrency_code
                basecurrency_to_point_rate
                action_id
                action
                created_at
                note
                created_by
                is_expired
                expires_at
            }
        }
    }
`;
