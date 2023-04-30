import { useReducer } from 'react';
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_MULTIPLE_TO_CART, TOGGLE_CART, UPDATE_CART_QUANTITY } from './actions';


export const reducer = (state, action) => {
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
        }
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

  };
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }
