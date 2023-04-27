import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_PRODUCT } from "../utils/mutations";
import "./admin.css";

const Admin = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    quantity: 0,
    categories: [],
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

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
      const mutationResponse = await addProduct({
        variables: {
          product: productData,
        },
      });

      console.log(mutationResponse);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
      <button type="submit">Add Product</button>
    </form>
  );
};

export default Admin;
