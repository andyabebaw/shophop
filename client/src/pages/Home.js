import React from "react";
import ProductItem from '../components/ProductItem';
import { Col, Row } from 'antd';

const Home = () => {
  return <div>
    <Row gutter={[32, 16]} justify={'center'}>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
      <Col span={6}>
        <ProductItem title='title' description='description' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' alt='example' />
      </Col>
    </Row>

  </div>;
};

export default Home;
