import React from "react";
import Cart from "../components/Cart";
import CartItem from "../components/CartItem";
// import ProductItem from "../components/ProductItem";
import ProductList from "../components/ProductList";



const Home = () => {
  return <div className="container">
    Home
    <CartItem />
    <ProductList />
    {/* <ProductItem /> */}
    <Cart />
  </div>;
}

export default Home;
