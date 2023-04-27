import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import React from "react";
import CheckoutForm from "../CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Mzw9mK92Z1fiE1CORNk9wyLcLmycsOcIrKpX21C8KneWDqknDcUbRFsn7QQG1RHGPKV9efcgr8we2GzwCaVrYLq00yATUGZCs"
);

const Cart = () => {
  return (
    <div>
      <h3> Shopping Cart </h3>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Cart;
