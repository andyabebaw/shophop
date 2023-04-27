import { createContext, useReducer } from "react";
import {
  ADD_MULTIPLE_TO_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "./actions";

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
  loggedIn: false,
};

const StoreContext = createContext({
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
  loggedIn: false,
});

const storeReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product],
      };
    case REMOVE_FROM_CART:
      let updatedState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: updatedState.length > 0,
        cart: updatedState,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    default:
      return state;
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

export { StoreContext, StoreProvider };
