import { useQuery } from '@apollo/react-hooks';

export const useProductDetailCustom = props => {
    const {
        queries: { query },
        urlKey: { urlKey }
    } = props;

    const { loading, error, data } = useQuery(query, {
        fetchPolicy: 'no-cache',
        variables: {
            urlKey: urlKey
        }
    });
    let reward_point = null;
    if (
        data &&
        data.hasOwnProperty('productDetail') &&
        data.productDetail.hasOwnProperty('items') &&
        Array.isArray(data.productDetail.items) &&
        data.productDetail.items.length
    ) {
        reward_point = data.productDetail.items[0];
    }
    return {
        reward_point
    };
};
