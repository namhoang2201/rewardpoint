import React, { useEffect } from "react";
import Button from "@magento/venia-ui/lib/components/Button";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import InputRange from "react-input-range";
import defaultClasses from "./form.css";
import ReactLoading from "../BaseComponents/Loading/ReactLoading";
import { mergeClasses } from "@magento/venia-ui/lib/classify";
import { Price } from "@magento/peregrine";
import Total from "../BaseComponents/Total/index";
import { useRewardPoint } from "../../talons/useRewardPoint";
import CREATE_CART_MUTATION from "@magento/venia-ui/lib/queries/createCart.graphql";
import GET_CART_DETAILS_QUERY from "@magento/venia-ui/lib/queries/getCartDetails.graphql";
import { GET_CUSTOMER_AND_REWARD_INFO } from "./customerRewardPoint.gql";
import { SPEND_POINT_MUTATION } from "./spendPointMutation.gql";
import {
  AlertCircle as AlertCircleIcon,
  Smile as SuccessIcon,
} from "react-feather";
import Icon from "@magento/venia-ui/lib/components/Icon";
import $ from "jquery";
const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;
const successIcon = <Icon src={SuccessIcon} attrs={{ width: 18 }} />;
require("./inputRange.scss");

const FormRewardPoint = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { onCancel, isMiniCart } = props;
  const talonProps = useRewardPoint({
    mutations: {
      createCartMutation: CREATE_CART_MUTATION,
      spendPointMutation: SPEND_POINT_MUTATION,
    },
    queries: {
      getCartDetailsQuery: GET_CART_DETAILS_QUERY,
      getCustomerRewardInfo: GET_CUSTOMER_AND_REWARD_INFO,
    },
    icons: { successIcon: successIcon, errorIcon: errorIcon },
  });

  const {
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
  } = talonProps;
  // console.log(talonProps)

  // useEffect(()=>{
  //   $("#point-input").val(point_used);
  // })

  return (
    <div className={classes.root}>
      {!rewardpointInfo || isLoading || !cartData || !quote_currency_code ? (
        <LoadingIndicator />
      ) : (
        <div className={classes.body}>
          {isMiniCart && <h2 className={classes.heading}>Apply Reward</h2>}
          <div className={classes.line}>
            <span className={classes.title}>Your Reward Point</span>
            <span className={classes.value}>{currentBalancePoint}</span>
          </div>
          <div className={classes.line}>
            <span className={classes.title}>
              <span className={classes.ratepoint}>
                {rewardpointInfo ? parseInt(rewardpointInfo.rate_point) : 0}
              </span>{" "}
              point(s) can be redeemed for
            </span>
            <span className={classes.value}>
              <Price value={1} currencyCode={quote_currency_code} />
            </span>
          </div>
          <div className={classes.rwbar}>
            {point_slider === 1 && (
              <div className={classes.sliderpoint}>
                <div className="input-range">
                  <InputRange
                    maxValue={currentBalancePoint}
                    minValue={0}
                    value={pointSpend}
                    onChange={(point_spend) => {
                      setPointSpend(point_spend);
                      $("#point-input").val(point_spend);
                    }}
                  />
                </div>
              </div>
            )}
            <div className={classes.rwform}>
              <input
                type="number"
                id="point-input"
                name="pointspend"
                min="0"
                onKeyUp={(e) => {
                  if (parseInt(e.target.value) <= currentBalancePoint) {
                    setPointSpend(parseInt(e.target.value));
                  }
                }}
              />
              <button
                onClick={() =>
                  handleSpendPoint(parseInt($("#point-input").val()))
                }
              >
                Apply
              </button>
            </div>
          </div>
          {isLoading ? (
            <ReactLoading
              loadingStyle={
                isMiniCart
                  ? { width: "140", height: "150" }
                  : { width: "140", height: "40" }
              }
            />
          ) : (
            <Total
              classes={classes}
              data={cartData}
              currencyCode={quote_currency_code}
              spendPoint={pointSpend}
              isMiniCart={isMiniCart}
            />
          )}
        </div>
      )}
      <div className={classes.footer}>
        {isMiniCart && <Button onClick={onCancel}>Back</Button>}
      </div>
    </div>
  );
};

export default FormRewardPoint;
