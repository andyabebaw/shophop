import React from 'react';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductCard = ({ name, price, image, addToCart, _id }) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt={name}
        src={image}
        style={{ height: "25vh", objectFit: 'cover' }}
      />
    }
    actions={[
      <ShoppingCartOutlined key="addToCart" onClick={addToCart} />,
      <Button icon={<InfoCircleOutlined />} key="info" type="link" href={`/products/${_id}`} />
    ]}
  >
    <Meta
      title={name}
      description={`$${price}`}
    />
  </Card>
);

export default ProductCard;