import React from "react";
import { Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Admin from "./pages/Admin";
import Detail from "./pages/Detail";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/EditProduct" element={<EditProduct />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
