// import React from "react";
// import CreateProduct from "../components/ProductEditForm";
// import ProductLIst from "../components/ProductList"

// const EditProduct = () => {
//     return (
//         <div>
//             <CreateProduct />
//             {/* <ProductLIst /> */}
//         </div>
//     )
// }

// export default EditProduct;

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_PRODUCT } from "../utils/mutations";
import { Form, Input, Button, Upload, InputNumber } from 'antd';
import {
  PlusOutlined
} from "@ant-design/icons";

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

  const handleNameInputChange = (event) => {
    const { name, value } = event.target
    setProductData({ ...productData, [name]: parseFloat(value) });
  }

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

  const handleSubmit = async (values) => {
    console.log("productData in the form", values);
    // event.preventDefault();

    try {
      const mutationResponse = await addProduct({
        variables: {
          product: values,
        },
      });

      console.log(mutationResponse);
    } catch (err) {
      console.log('this is an error')
      console.error(err);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label htmlFor="name">Name:</label>
  //       <input
  //         type="text"
  //         id="name"
  //         name="name"
  //         value={productData.name}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="price">Price:</label>
  //       <input
  //         type="number"
  //         id="price"
  //         name="price"
  //         value={productData.price}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="quantity">Quantity:</label>
  //       <input
  //         type="number"
  //         id="quantity"
  //         name="quantity"
  //         value={productData.quantity}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="description">Description:</label>
  //       <textarea
  //         id="description"
  //         name="description"
  //         value={productData.description}
  //         onChange={handleInputChange}
  //       ></textarea>
  //     </div>
  //     <div>
  //       <label htmlFor="image">Image:</label>
  //       <input
  //         type="text"
  //         id="image"
  //         name="image"
  //         value={productData.image}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div className="categories">
  //       <label htmlFor="categories">Categories:</label>
  //       <input
  //         type="text"
  //         id="categories"
  //         name="categories"
  //         value={productData.categories.join(", ")}
  //         onChange={handleCategoryInputChange}
  //       />
  //       <button type="button" onClick={handleClearCategories}>
  //         Clear Categories
  //       </button>
  //     </div>
  //     <button type="submit">Add Product</button>
  //   </form>
  // );
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        categories: [],
        image: ""
      }}
      onFinish={(values) => {
        handleSubmit(values)
        // console.log(values)
      }}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        label="Product Name"
        name="name"

        // onChange={handleNameInputChange}
        rules={[{ required: true, message: 'Product name Required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Product Description"
        name="description"
        // value={productData.price}
        // onChange={handleInputChange}
        rules={[{ required: true, message: 'Product Description Required' }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item label="image" name="image" valuePropName="fileList" getValueFromEvent={normFile}> */}
      {/* <Form.Item label="Image" name="image" valuePropName="fileList" value="">
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item> */}

      <Form.Item
        label="Image"
        name="image"
      // onChange={handleCategoryInputChange}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Quantity Required' }]}
      // value={productData.quantity}
      // onChange={handleInputChange}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Quantity Required' }]}
      // value={productData.price}
      // onChange={handleInputChange}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categories"
      // onChange={handleCategoryInputChange}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Admin;
