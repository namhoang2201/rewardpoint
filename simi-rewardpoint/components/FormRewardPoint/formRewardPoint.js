import { useState, useCallback, useEffect } from "react";
import { getRestCart } from "../rest/Cart";
import { useCartContext } from "@magento/peregrine/lib/context/cart";
import { useUserContext } from "@magento/peregrine/lib/context/user";

export const useRestCart = (props) => {
  const [{ isSignedIn }] = useUserContext();
  const [{ cartId }] = useCartContext();
  const [cartData, setCartData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const restCartCallback = useCallback(
    (data) => {
      if (data) {
        setLoading(false);
        setCartData(data);
      }
    },
    [setLoading, setCartData]
  );

  const getCartDetailCustom = useCallback(() => {
    setLoading(true);
    getRestCart(restCartCallback, isSignedIn, cartId);
  }, [isSignedIn, cartId, restCartCallback]);

  useEffect(() => {
    getCartDetailCustom();
  }, []);

  let earn_point = 0;
  let spend_point = 0;
  let spend_amount = 0;
  let quote_currency_code = null;
  if (cartData) {
    const { extension_attributes } = cartData;
    quote_currency_code = cartData.quote_currency_code;
    earn_point = extension_attributes.earn_points;
    if (
      extension_attributes &&
      extension_attributes.hasOwnProperty("spend_points")
    ) {
      spend_point = extension_attributes.spend_points;
    }
    if (
      cartData &&
      cartData.total_segments &&
      Array.isArray(cartData.total_segments) &&
      cartData.total_segments.length
    ) {
      cartData.total_segments.forEach((item) => {
        if (item.code === "spend_point") {
          spend_amount = item.value;
        }
      });
    }
  }

  return {
    isSignedIn,
    cartId,
    isLoading,
    setLoading,
    cartData,
    getCartDetailCustom,
    earn_point,
    spend_point,
    spend_amount,
    quote_currency_code,
  };
};
