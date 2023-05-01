import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
// import ProductItem from '../components/ProductItem';
import { Col, Row, Space, Input } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
// import { UPDATE_PRODUCT } from "../utils/mutations";
// import ProductItem from '../components/ProductItem';
// import Cart from "../components/Cart";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [search, setSearch] = useState("");
  const { Search } = Input;
  const styles = {
    search: {
      position: 'relative',
      bottom: '6vh',
      left: '40%'
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={styles.search}>
        <Search
          placeholder="Search By Cateogry"
          name="search"
          onSearch={setSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <Row gutter={[16, 32]} justify={"center"} style={{ padding: "5vh" }}>
        {data?.products
          ?.filter((d) => {
            const nameMatch = d.name.toLowerCase().includes(search.toLowerCase());
            const categoryMatch = d.categories.some((category) =>
              category.name.toLowerCase().includes(search.toLowerCase())
            );
            return search.toLocaleLowerCase() === ""
              ? d
              : nameMatch || categoryMatch;
          })
          .map((d) => (
            <Col span={6} key={d._id}>
              <ProductCard
                name={d.name}
                price={d.price}
                image={
                  d.image
                }
                _id={d._id}
              />
            </Col>
          ))}
      </Row>
    </>
  );

};
export default Home;
