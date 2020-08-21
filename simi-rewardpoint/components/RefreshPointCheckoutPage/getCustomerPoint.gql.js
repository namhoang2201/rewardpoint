import gql from 'graphql-tag';

export const getCustomerQuery = gql`
    query getCustomer {
        customer {
            id
            email
            firstname
            lastname
            reward_point {
                point
                point_used
                point_expired
                amount
                notify_balance
                notify_expiration
                rate_point
            }
        }
    }
`;
