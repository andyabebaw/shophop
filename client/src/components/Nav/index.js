import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/authContext";
import {
  LoginOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  ThunderboltOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Layout, Menu, Input, Divider } from "antd";
import React, { useState } from "react";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    // setCurrent(e.key);
    if (e.key === 'logout') {
      handleLogout()
    }
  };

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const { Search } = Input;

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

  const style = {
    position: "relative",
    display: "flex",
    justifyContent: "right",
    alignItems: "flex-end"
  };

  let items;

  const onSearch = (value) => console.log(value);

  if (user?.data.isAdmin) {
    items = [
      {
        label: (
          <a href="/" rel="noopener noreferrer">
            Home
          </a>
        ),
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: <Divider type='vertical'/>,
        disabled: true,
        style: { cursor: 'auto'}

      },
      {
        label: "Admin Options",
        key: "SubMenu",
        icon: <ThunderboltOutlined />,
        children: [
          {
            label: (
              <a href="/addproduct" rel="noopener noreferrer">
                Add/Edit Products
              </a>
            ),
            key: "addproduct",
            icon: <PlusCircleFilled />,
          }
        ],
      },
      {
        label: <Divider type='vertical'/>,
        disabled: true,
        style: { cursor: 'auto'}

      },
      {
        label: "Logout",
        key: "logout",
        icon: <LogoutOutlined />,

      }
    ]
  } else if (user === null) {
    items = [
      {
        label: (
          <a href="/" rel="noopener noreferrer">
            Home
          </a>
        ),
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: <Divider type='vertical'/>,
        disabled: true,
        style: { cursor: 'auto'}

      },
      {
        label: (
          <a href="/login" rel="noopener noreferrer">
            Login
          </a>
        ),
        key: "login",
        icon: <LoginOutlined />,
      }]
  } else if (!user?.data.isAdmin) {
    items = [
      {
        label: (
          <a href="/" rel="noopener noreferrer">
            Home
          </a>
        ),
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: <Divider type='vertical'/>,
        disabled: true,
        style: { cursor: 'auto'}

      },
      {
        label: "Logout",
        key: "logout",
        icon: <LogoutOutlined />,

      }
    ]
  }

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
};



export default Navbar;
