import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
// import ProductItem from '../components/ProductItem';
import { Col, Row, Space } from "antd";
import ProductCard from "../components/ProductCard";
// import Cart from "../components/Cart";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //   }
  //   console.log("loading", loading);
  //   console.log("product data", data);
  // }, [data, loading]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <>
  //     <div>Homepage</div>
  //     <hr />
  //     {data?.products?.map((d) => (
  //       <div key={d._id}>
  //         <div>{d._id}</div>
  //         <div>{d.name}</div>
  //       </div>
  //     ))}
  //   </>
  // );

  return (
    <Row gutter={[16, 32]} justify={"center"}>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
      <Col span={6}>
        <ProductCard
          name="hi"
          price={22}
          image={
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
          _id={1}
        />
      </Col>
    </Row>
  );
};

export default Home;
