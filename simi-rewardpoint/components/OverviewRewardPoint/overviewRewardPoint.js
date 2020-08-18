import React from "react";
import {Price} from '@magento/peregrine';
import { useRestCart } from "../../talons/useRestCart";
import ReactLoading from '../BaseComponents/Loading/ReactLoading';

const OverviewRewardPoint = (props) => {
  const talonProps = useRestCart();
  const {
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
  } = talonProps;

  const customStyle1 = { fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }
  const customStyle2 = { color: '#1498d0', fontSize: '14px' }

  return !cartData ? (
    <ReactLoading loadingStyle={{ width: "120", height: "42" }} />
  ) : (
    <React.Fragment>
      <span style={customStyle1}>
        Point will earn: <span style={customStyle2}>{earn_point}</span>
      </span>
      <span style={customStyle1}>
        Spending point:{" "}
        <span style={customStyle2}>
          {spend_point}
        </span>
      </span>
      <span style={customStyle1}>
        Discount amount:{" "}
        <span style={customStyle2}>
          <Price currencyCode={quote_currency_code} value={spend_amount} />
        </span>
      </span>
    </React.Fragment>
  );
};

export default OverviewRewardPoint;
