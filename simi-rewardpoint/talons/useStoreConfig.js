import { useQuery } from '@apollo/react-hooks';

export const useStoreConfig = props => {
    const {
        queries: { bssRewardPointsStoreConfigQuery },
        variables: { variables }
    } = props;

    const { data } = useQuery(bssRewardPointsStoreConfigQuery, {
        fetchPolicy: 'cache-first',
        variables: variables
    });

    return {
        data
    };
};
