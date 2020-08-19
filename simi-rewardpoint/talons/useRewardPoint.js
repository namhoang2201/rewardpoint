import { useState, useCallback } from "react";
import { useApolloClient, useQuery, useMutation } from "@apollo/react-hooks";
import { useCartContext } from "@magento/peregrine/lib/context/cart";
import { useAwaitQuery } from "@magento/peregrine/lib/hooks/useAwaitQuery";
import { useToasts } from "@magento/peregrine";
import { useRestCart } from "@simicart/simi-module/overwrites/talons/CartPage/useRestCart";
import { getDataFromStoreage } from "@simicart/simi-module/util/storeData";

export const useRewardPoint = (props) => {
  const {
    mutations: { createCartMutation, spendPointMutation },
    queries: { getCartDetailsQuery, getCustomerRewardInfo },
    icons: { successIcon, errorIcon },
    isMiniCart: {isMiniCart},
    updateTotal: {updateTotal}
  } = props;

  const apolloClient = useApolloClient();
  const [{ cartId }, { getCartDetails }] = useCartContext();

  const { data } = useQuery(getCustomerRewardInfo, {
    fetchPolicy: "no-cache",
    variables: {
      cartId,
    },
    skip: !cartId,
  });

  const [fetchCartId] = useMutation(createCartMutation);
  const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

  const rewardpointInfo = data ? data.customer.reward_point : null;
  const currentBalancePoint = rewardpointInfo
    ? parseInt(rewardpointInfo.point) - parseInt(rewardpointInfo.point_expired)
    : 0;
  const point_used = rewardpointInfo
    ? Math.abs(parseInt(rewardpointInfo.point_used))
    : 0;
  console.log(data);
  // useEffect(() => {
  //     // Passing apolloClient to wipe the store in event of auth token expiry
  //     // This will only happen if the user refreshes.
  //     getCartDetails({ apolloClient, fetchCartId, fetchCartDetails });
  // }, [apolloClient, fetchCartDetails, fetchCartId, getCartDetails]);

  const refreshCart = useCallback(async () => {
    // TODO: Cart details should be fetched by MiniCart.
    await getCartDetails({
      apolloClient,
      fetchCartId,
      fetchCartDetails,
    });
  }, [apolloClient, fetchCartDetails, fetchCartId, getCartDetails]);

  // custom spend point action

  const [pointSpend, setPointSpend] = useState(point_used);
  const storeConfig = getDataFromStoreage("SESSION_STOREAGE", "STORE_CONFIG");
  let point_slider = 0;
  if (
    storeConfig &&
    storeConfig.hasOwnProperty("bssRewardPointStoreConfig") &&
    storeConfig.bssRewardPointStoreConfig.hasOwnProperty("point_slider")
  ) {
    point_slider = storeConfig.bssRewardPointStoreConfig.point_slider;
  }
  const restTalons = useRestCart();
  const {
    isSignedIn,
    isLoading,
    setLoading,
    cartData,
    getCartDetailCustom,
    earn_point,
    spend_point,
    spend_amount,
    quote_currency_code,
  } = restTalons;

  const updatePointInfo = useCallback(() => {
    getCartDetailCustom();
  }, [getCartDetailCustom]);

  const [, { addToast }] = useToasts();

  const [spendPointAction, { dataPoint, error }] = useMutation(
    spendPointMutation,
    {
      onCompleted: (data) => {
        updatePointInfo();
        if(isMiniCart){
          refreshCart();
        }else{
          updateTotal()
        }
        if (data && data.applyRewardPoint && data.applyRewardPoint.cart) {
          const { error_message, success } = data.applyRewardPoint.cart;
          if (success) {
            addToast({
              type: "info",
              icon: successIcon,
              message: "You spent point successfully !",
              timeout: 2000,
            });
          } else {
            addToast({
              type: "error",
              icon: errorIcon,
              message: error_message,
              timeout: 2000,
            });
          }
        }
      },
      onError: (error) => {
        refreshCart();
        console.log(error);
        addToast({
          type: "error",
          icon: errorIcon,
          message: "Something went wrong, please try again later !",
          timeout: 3000,
        });
      },
    }
  );

  const handleSpendPoint = (numberPointSpend) => {
    if (!numberPointSpend || numberPointSpend < 1) {
      addToast({
        type: "error",
        icon: errorIcon,
        message: "Your point to spend is invalid !",
        timeout: 3000,
      });
    } else {
      spendPointAction({
        variables: {
          cartId: cartId,
          amount: numberPointSpend,
        },
      });
    }
  };

  return {
    refreshCart,
    currentBalancePoint,
    rewardpointInfo,
    cartId,
    point_slider,
    handleSpendPoint,
    point_used,
    pointSpend,
    setPointSpend,
    isSignedIn,
    isLoading,
    cartData,
    quote_currency_code,
    updatePointInfo,
  };
};
