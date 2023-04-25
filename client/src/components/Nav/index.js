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
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Title',
    key: 'title'
  },
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

const Nav: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
};

export default Nav;


  // import React from 'react';
  // import { Col, Divider, Row } from 'antd';

  // const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

  // const App: React.FC = () => (
  //   <>
  //     <Divider orientation="left">Horizontal</Divider>
  //     <Row gutter={16}>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //     </Row>
  //     <Divider orientation="left">Responsive</Divider>
  //     <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //     </Row>
  //     <Divider orientation="left">Vertical</Divider>
  //     <Row gutter={[16, 24]}>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //       <Col className="gutter-row" span={6}>
  //         <div style={style}>col-6</div>
  //       </Col>
  //     </Row>
  //   </>
  // );

  // export default App;

  // import React from 'react';
  // import { Col, Row } from 'antd';

  // const App: React.FC = () => (
  //   <>
  //     <Row>
  //       <Col span={8}>col-8</Col>
  //       <Col span={8} offset={8}>
  //         col-8
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col span={6} offset={6}>
  //         col-6 col-offset-6
  //       </Col>
  //       <Col span={6} offset={6}>
  //         col-6 col-offset-6
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col span={12} offset={6}>
  //         col-12 col-offset-6
  //       </Col>
  //     </Row>
  //   </>
  // );

  // export default App;