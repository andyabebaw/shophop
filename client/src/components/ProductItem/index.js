import React from 'react';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const ProductItem: React.FC = ({ title, description, src, alt }) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt= {alt}
        src= {src}
      />
    }
    actions={[
      <ShoppingCartOutlined key="addToCart"/>,
      <InfoCircleOutlined key="info"/>
    ]}
  >
    <Meta
      title= {title}
      description={description}
    />
  </Card>
);

export default ProductItem;