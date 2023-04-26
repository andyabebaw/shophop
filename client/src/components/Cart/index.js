import React, { useEffect } from "react";

// import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
// import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_MULTIPLE_TO_CART, TOGGLE_CART } from "../../utils/actions";
// import Auth from "../../utils/auth";
// import { idbPromise } from "../../utils/helpers";
// import { QUERY_CHECKOUT } from "../../utils/queries";
// import CartItem from "../CartItem";

const stripePromise = loadStripe(
  "pk_test_51Mzw9mK92Z1fiE1CORNk9wyLcLmycsOcIrKpX21C8KneWDqknDcUbRFsn7QQG1RHGPKV9efcgr8we2GzwCaVrYLq00yATUGZCs"
);


function Cart() {
  return (
    <div> Cart</div>
  )
}

export default Cart;

