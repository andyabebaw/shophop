import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/authContext";
import "./nav.css";

import {
  ContactsFilled,
  LoginOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  ShoppingCartOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Menu
        style={style}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </Layout>
  );
  // const { user, logout } = useContext(AuthContext);
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  // return (
  //   <nav>
  //     <div className="nav-container">
  //       <ul className="nav-menu">
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li></li>
  //         {user ? (
  //           <>
  //             <li>
  //               <button onClick={handleLogout}>Logout</button>
  //             </li>
  //           </>
  //         ) : (
  //           <>
  //             <li>
  //               <Link to="/login">Login / Signup</Link>
  //             </li>
  //           </>
  //         )}
  //         <li className="search-container">
  //           <input type="text" placeholder="Search..." />
  //         </li>
  //         {user?.data.isAdmin && (
  //           <li>
  //             <Link to="/admin">Admin</Link>
  //           </li>
  //         )}
  //         <li>
  //           <Link to="/cart">Cart</Link>
  //         </li>
  //       </ul>
  //     </div>
  //   </nav>
  // );
};

const style = {
  position: "relative",
  display: "flex",
  justifyContent: "right",
};

const items = [
  // {
  //   label: 'Title',
  //   key: 'title'
  // },
  {
    label: "Admin Options",
    key: "SubMenu",
    icon: <ThunderboltOutlined />,
    children: [
      {
        label: "Add/Edit Products",
        key: "setting:1",
        icon: <PlusCircleFilled />,
      },
      {
        label: "Edit Profile",
        key: "setting:2",
        icon: <ContactsFilled />,
      },
    ],
  },
  {
    label: "Edit Profile",
    key: "edit profile",
    icon: <UserOutlined />,
  },
  {
    label: "Login",
    key: "login",
    icon: <LoginOutlined />,
  },
  {
    label: "Logout",
    key: "logout",
    icon: <LogoutOutlined />,
  },
  // {
  //   label: 'Cart',
  //   key: 'cart',
  //   icon: <ShoppingCartOutlined />,
  // },
];

export default Navbar;
