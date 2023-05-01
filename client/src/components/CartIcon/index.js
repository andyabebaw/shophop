import { ShoppingCartOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from '../../utils/context/authContext';

const CartIcon = () => {
     const navigate = useNavigate();
     const { user }= useContext(AuthContext); 

    const displayCart = (e) => {
      console.log("click ", e);
    };

   const openCartPage = () =>{
    navigate("/cart");
    if (user) {
    <a href="/cart">
      </a>
    }
    displayCart()
   }
  return (
  <div> 
  <FloatButton
    type={"primary"}
    icon={<ShoppingCartOutlined />}
    shape={"square"}
    onClick={openCartPage}  />
  </div>
);
  }
export default CartIcon;
