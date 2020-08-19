import { useQuery } from '@apollo/react-hooks';

export const useCustomerPoint = props => {
    const {
        queries: { getCustomerQuery }
    } = props;

    const { data, loading, error } = useQuery(getCustomerQuery, {
        fetchPolicy: 'no-cache'
    });

    let point = 0;
    let balance = 0;
    let poin_expired = 0;
    let point_spent = 0;
    let point_earned = 0;
    let exchange_rate = 0;
    if (data) {
      point = parseInt(data.customer.reward_point.point);
      poin_expired = parseInt(data.customer.reward_point.point_expired);
      balance = point - poin_expired > 0 ? point - poin_expired : 0;
      point_spent = data.customer.reward_point.point_used
        ? parseInt(data.customer.reward_point.point_used)
        : 0;
      point_earned = point - point_spent > 0 ? point - point_spent : 0;
      exchange_rate = data.customer.reward_point.rate_point
        ? parseInt(data.customer.reward_point.rate_point)
        : 0;
    }

    return {
        data,
        loading,
        error,
        balance,
        point_earned,
        point_spent,
        exchange_rate
    };
};