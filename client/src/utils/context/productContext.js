import { createContext, useReducer } from "react";

const initialState = {
  reviews: [],
  currentProductId: null,
};

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_REVIEWS":
      return { ...state, reviews: action.payload };
    case "UPDATE_PRODUCT_REVIEW":
      return { ...state, reviews: [...state.reviews, action.payload] };
    case "SET_CURRENT_PRODUCT_ID":
      return { ...state, currentProductId: action.payload };
    case "CLEAR_REVIEWS":
      return { ...state, reviews: [] };
    default:
      return state;
  }
};

const ProductProvider = (props) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return <ProductContext.Provider value={{ state, dispatch }} {...props} />;
};

export { ProductContext, ProductProvider };
