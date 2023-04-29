import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_PRODUCT } from "../utils/mutations";
import { QUERY_PRODUCT_ById } from "../utils/queries";

const Edit = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    quantity: 0,
    categories: [],
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const productId = useParams().id;
  const { loading, data } = useQuery(QUERY_PRODUCT_ById, {
    variables: { id: productId },
  });
  const product = data?.product || {};

  console.log(product);

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
          _id: productId,
          product: productData,
        },
      });
      console.log("mutationResponse", mutationResponse);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
      <hr />
      <h2>Product Data</h2>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <h3>Category:</h3>
      {product.categories?.map((tag) => {
        return <div>{tag.name}</div>;
      })}
      <h3>Reviews:</h3>
      {product.reviews?.map((review) => {
        return <div>{review.reviewBody}</div>;
      })}
    </>
  );
};

export default Edit;
