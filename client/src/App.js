import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Detail from "./pages/Detail";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Cart from './components/Cart'

function App() {
  return (
    <>
      <div>
        <Nav />
        <Cart />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editproduct" element={<EditProduct />} />
            <Route path="/products/:id" element={<Detail />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
