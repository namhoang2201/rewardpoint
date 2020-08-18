import gql from 'graphql-tag';

export const BSS_STORE_CONFIG_QUERY = gql`
  query getBssRewardPointStoreConfig($storeview: Int!) {
    bssRewardPointStoreConfig(storeview: $storeview) {
      active
      redeem_threshold
      maximum_threshold
      expire_day
      earn_tax
      earn_shipping
      earn_order_paid
      maximum_earn_order
      maximum_earn_review
      auto_refund
      maximum_point_order
      allow_spend_tax
      allow_spend_shipping
      restore_spent
      point_icon
      sw_point_header
      point_mess_register
      point_subscrible
      cart_order_summary
      product_page_tab_review
      product_page_reward_point
      cate_page_reward_point
      point_slider
      sender
      earn_point_template
      spend_point_template
      expiry_warning_template
      expire_day_before
      subscrible
    }
  }
`;
