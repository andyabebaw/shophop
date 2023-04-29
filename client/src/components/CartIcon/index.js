import { ShoppingCartOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React, { useContext } from "react";
// import Cart from "../"
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from '../../utils/context/authContext';

const CartIcon = () => {
    // <Cart /> 
     const { current , setCurrent } = useState("");
     const navigate = useNavigate();
     const { user }= useContext(AuthContext); 

    const onClick = (e) => {
      console.log("click ", e);
      // setCurrent(e.key);
      if (e.key === 'addtoCart') {
        openCartPage()
      }
    };
   const openCartPage = () =>{
    setCurrent();
    navigate("/cart");
    if (user) {
    <a href="/cart">
      </a>
    }
   }
  return (
  <div> 
  <FloatButton
    type={"primary"}
    icon={<ShoppingCartOutlined />}
    shape={"square"}
    // selectedKeys={[current]}
    key= "addtoCart"
    onClick={onClick}  />
  </div>
);
  }
export default CartIcon;
