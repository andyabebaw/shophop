import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
// import ProductItem from '../components/ProductItem';
import { Col, Row, Space } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { UPDATE_PRODUCT } from "../utils/mutations";
// import ProductItem from '../components/ProductItem';
// import Cart from "../components/Cart";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [search, setSearch] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    quantity: 0,
    categories: [],
  });

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //   }
  //   console.log("loading", loading);
  //   console.log("product data", data);
  // }, [data, loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Convert price to float
    if (name === "price") {
      setProductData({ ...productData, [name]: parseFloat(value) });
    }

    // Convert quantity to integer
    else if (name === "quantity") {
      setProductData({ ...productData, [name]: parseInt(value) });
    }

    // For other fields, just set the value as is
    else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleCategoryInputChange = (event) => {
    const { value } = event.target;
    setProductData({
      ...productData,
      categories: value.split(",").map((category) => category.trim()),
    });
  };

  const handleClearCategories = () => {
    setProductData({ ...productData, categories: [] });
  };

  const handleSubmit = async (event) => {
    console.log("productData in the form", productData);
    event.preventDefault();

    try {
      const mutationResponse = await updateProduct({
        variables: {
          // TODO: change this to the product id you want to update, from the URL param or state
          _id: "6449d6c5e7a3af290a38bbd5",
          product: productData,
        },
      });
      console.log("mutationResponse", mutationResponse);
    } catch (err) {
      console.error(err);
    }
  };

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
          const nameMatch = d.name.toLowerCase().includes(search.toLowerCase());
          const categoryMatch = d.categories.some((category) =>
            category.name.toLowerCase().includes(search.toLowerCase())
          );
          return search.toLocaleLowerCase() === ""
            ? d
            : nameMatch || categoryMatch;
        })
        .map((d) => (
          <Link to={`/products/${d._id}`} key={d._id}>
            <div style={{ border: "1px red solid", color: "blue" }}>
              <div>{d._id}</div>
              <div>${d.price}</div>
              <div>{d.name}</div>
            </div>
          </Link>
        ))}
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="categories">
          <label htmlFor="categories">Categories:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={productData.categories.join(", ")}
            onChange={handleCategoryInputChange}
          />
          <button type="button" onClick={handleClearCategories}>
            Clear Categories
          </button>
        </div>
        <button type="submit">Update Product</button>
      </form>
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
