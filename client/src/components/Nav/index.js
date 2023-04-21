import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Admin Options',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [

      {
        label: 'Add/Edit Products',
        key: 'setting:1',
      },
      {
        label: 'Edit Profile',
        key: 'setting:2',
      },

    ],
  },
  {
    label: 'Edit Profile',
    key: 'edit profile',
    icon: <SettingOutlined />,
  },
  {
    label: 'Login',
    key: 'login',
    icon: <MailOutlined />,
  },
  {
    label: 'Cart',
    key: 'cart',
    icon: <MailOutlined />,
  },
];

const Nav: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Nav;