import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { AuthContext }  from '../../utils/context/authContext';
import { useContext } from "react";
import CartItem from '../CartItem';
import { idbPromise } from "../../utils/helpers";
import { useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { QUERY_CHECKOUT } from '../../utils/queries';


const stripePromise = loadStripe(
  "pk_test_51Mzw9mK92Z1fiE1CORNk9wyLcLmycsOcIrKpX21C8KneWDqknDcUbRFsn7QQG1RHGPKV9efcgr8we2GzwCaVrYLq00yATUGZCs"
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const { user }= useContext(AuthContext); 

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
      getCart();
    }
  }, [state.cart.length, dispatch]);

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
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div>
            <strong>Total: ${calculateTotal()}</strong>

            {user.loggedIn() ? (
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