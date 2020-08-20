import gql from 'graphql-tag';

export const updateNotifyMutation = gql`
    mutation updateNotify($notify_balance: Int, $notify_expiration: Int) {
        updateNotify(
            input: {
                notify_balance: $notify_balance
                notify_expiration: $notify_expiration
            }
        ) {
            status {
                success
                message
            }
        }
    }
`;
