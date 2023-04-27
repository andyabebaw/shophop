import { ShoppingCartOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";

const CartIcon = () => (
  <FloatButton
    type={"primary"}
    icon={<ShoppingCartOutlined />}
    shape={"square"}
    onClick={() => console.log("click")}
  />
);

export default CartIcon;
