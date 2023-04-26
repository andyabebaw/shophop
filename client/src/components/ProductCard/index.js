import React from 'react';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const ProductCard = ({ name, price, src, addToCart }) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt={name}
        src={src}
      />
    }
    actions={[
      <ShoppingCartOutlined key="addToCart" onClick={addToCart}/>,
      <InfoCircleOutlined key="info"/>
    ]}
  >
    <Meta
      title={name}
      description={`$${price}`}
    />
  </Card>
);

export default ProductCard;