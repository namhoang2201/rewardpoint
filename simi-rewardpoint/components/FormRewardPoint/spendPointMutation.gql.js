import gql from "graphql-tag";

export const SPEND_POINT_MUTATION = gql`
  mutation applyRewardPoint($cartId: String, $amount: Int) {
    applyRewardPoint(input: { cart_id: $cartId, amount: $amount }) {
      cart {
        success
        error_message
      }
    }
  }
`;