import React, { useState } from "react";
import {
  ThunderboltOutlined,
  UserOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  ContactsFilled
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';

const style = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'right',
}

const items = [
  // {
  //   label: 'Title',
  //   key: 'title'
  // },
  {
    label: 'Admin Options',
    key: 'SubMenu',
    icon: <ThunderboltOutlined />,
    children: [

      {
        label: 'Add/Edit Products',
        key: 'setting:1',
        icon: <PlusCircleFilled />
      },
      {
        label: 'Edit Profile',
        key: 'setting:2',
        icon: <ContactsFilled />
      },

    ],
  },
  {
    label: 'Edit Profile',
    key: 'edit profile',
    icon: <UserOutlined />,
  },
  {
    label: 'Login',
    key: 'login',
    icon: <LoginOutlined />,
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
  // {
  //   label: 'Cart',
  //   key: 'cart',
  //   icon: <ShoppingCartOutlined />,
  // },
];

const Nav = () => {
  const [current, setCurrent] = useState('');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Menu style={style} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </Layout>
  );
};

export default Nav;
