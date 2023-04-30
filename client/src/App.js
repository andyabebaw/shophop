import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import CartIcon from "./components/CartIcon";
import Nav from "./components/Nav";
import AddProduct from "./pages/AddProduct";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <div>
      <Nav />
      <CartIcon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
