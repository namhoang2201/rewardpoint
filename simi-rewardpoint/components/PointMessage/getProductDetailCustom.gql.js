import gql from 'graphql-tag';

export const GET_PRODUCT_DETAIL_CUSTOM = gql`
    query productDetail($urlKey: String) {
        productDetail: products(filter: { url_key: { eq: $urlKey } }) {
            items {
                __typename
                id
                name
                sku
                url_key
                reward_point {
                    customer_point {
                        message
                        review_point
                    }
                    product_point {
                        assign_by
                        dependent_qty
                        point
                        message
                        receive_point
                    }
                }
            }
        }
    }
`;
