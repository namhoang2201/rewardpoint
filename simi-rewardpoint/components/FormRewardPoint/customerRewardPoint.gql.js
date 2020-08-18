import gql from 'graphql-tag';

export const GET_CUSTOMER_AND_REWARD_INFO =  gql`
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