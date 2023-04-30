import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/authContext";
import {
  LoginOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  ThunderboltOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Layout, Menu, Divider, Image } from "antd";
import React, { useState } from "react";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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

  const styles = {
    nav: {
      position: "relative",
      display: "flex",
      justifyContent: "right",
      alignItems: "flex-end"
    },
    logo: {
      position: 'absolute',
      bottom: '1vh',
    }
  }

  let items;

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
        label: <Divider type='vertical' />,
        disabled: true,
        style: { cursor: 'auto' }

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
        label: <Divider type='vertical' />,
        disabled: true,
        style: { cursor: 'auto' }

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
        label: <Divider type='vertical' />,
        disabled: true,
        style: { cursor: 'auto' }

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
        label: <Divider type='vertical' />,
        disabled: true,
        style: { cursor: 'auto' }

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
        style={styles.nav}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
            <Image
        style={styles.logo}
        width={100}
        preview={false}
        src="https://res.cloudinary.com/dbnrnwpje/image/upload/v1682885252/ora61jpc45dgsbe3sl0q.png"
      />
    </Layout>
  );
};



export default Navbar;
