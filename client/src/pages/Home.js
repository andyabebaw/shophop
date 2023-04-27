import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
// import ProductItem from '../components/ProductItem';
import { Col, Row, Space } from "antd";
import ProductCard from "../components/ProductCard";
// import ProductItem from '../components/ProductItem';
// import Cart from "../components/Cart";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    console.log("loading", loading);
    console.log("product data", data);
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Homepage</div>
      <hr />
      <input
        placeholder="search by categories"
        onChange={(e) => setSearch(e.target.value)}
      />
      <hr />
      {data?.products
        ?.filter((d) => {
          return search.toLocaleLowerCase() === ""
            ? d
            : d.categories.some((category) =>
                category.name.toLowerCase().includes(search.toLowerCase())
              );
        })
        .map((d) => (
          <div key={d._id}>
            <div>${d.price}</div>
            <div>{d.name}</div>
          </div>
        ))}
    </>
  );

  // return (
  //   <Row gutter={[16, 32]} justify={"center"}>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //     <Col span={6}>
  //       <ProductCard
  //         name="hi"
  //         price={22}
  //         image={
  //           "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //         }
  //         _id={1}
  //       />
  //     </Col>
  //   </Row>
  // );
};
export default Home;
