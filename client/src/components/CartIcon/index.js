import React from 'react';
import { FloatButton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons'

const CartIcon = () => <FloatButton type={'primary'} icon={<ShoppingCartOutlined />} shape={'square'} onClick={() => console.log('click')} />;

export default CartIcon;