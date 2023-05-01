import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { AuthProvider } from '../../utils/context/authContext';
import CartItem from '../CartItem';
import { idbPromise } from "../../utils/helpers";
import { useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART, TOGGLE_CART} from '../../utils/actions';
import { QUERY_CHECKOUT } from '../../utils/queries';


const stripePromise = loadStripe(
  "pk_test_51Mzw9mK92Z1fiE1CORNk9wyLcLmycsOcIrKpX21C8KneWDqknDcUbRFsn7QQG1RHGPKV9efcgr8we2GzwCaVrYLq00yATUGZCs"
);

const Cart = () => {

  const [state, dispatch] = useStoreContext();
  // console.log("=========testing========")

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      console.log("cart fetched")
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }
  return (
    <div className="cart">
         <div className="close" onClick={toggleCart}>
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length && AuthProvider.user ? (
        <div>
          {state.cart.map((item) => (
          
            <CartItem key={item._id} item={item} /> 
          ))}  

          <div>
            <strong>Total: ${calculateTotal()}</strong>

            {AuthProvider.user ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <strong>
          You haven't added anything to your cart yet!
        </strong>
      )}
    </div>
  );
};

export default Cart;