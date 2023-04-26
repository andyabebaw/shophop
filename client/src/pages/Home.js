import React from "react";
import ProductItem from '../components/ProductItem';
import ProductCard from '../components/ProductCard'
import { Col, Row, Space } from 'antd';

const Home = () => {
  return (

    <Row gutter={[16, 32]} justify={'center'}>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
      <Col span={6}>
        <ProductCard name="hi" price={22} image={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} _id={1} />
      </Col>
    </Row>
  );
};

export default Home;
