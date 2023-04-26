import React from "react";
import { Route, Routes, Router } from "react-router-dom";

import Nav from "./components/Nav";
import Detail from "./pages/Detail";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import CartIcon from './components/CartIcon'
import AddProduct from './pages/AddProduct'

function App() {
  return (

      <div>
        <Nav />
        <CartIcon />
        {/* <Router> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editproduct" element={<EditProduct />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/products/:id" element={<Detail />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        {/* </Router> */}
      </div>

  );
}

export default App;
