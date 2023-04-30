import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_PRODUCT } from "../utils/mutations";
import { QUERY_PRODUCT_ById } from "../utils/queries";
import { Form, Input, Button, Upload, InputNumber, Space } from 'antd';
import {
  PlusOutlined
} from "@ant-design/icons";

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

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   // Convert price to float
  //   if (name === "price") {
  //     setProductData({ ...productData, [name]: parseFloat(value) });
  //   }

  //   // Convert quantity to integer
  //   else if (name === "quantity") {
  //     setProductData({ ...productData, [name]: parseInt(value) });
  //   }

  //   // For other fields, just set the value as is
  //   else {
  //     setProductData({ ...productData, [name]: value });
  //   }
  // };

  // const handleCategoryInputChange = (event) => {
  //   const { value } = event.target;
  //   setProductData({
  //     ...productData,
  //     categories: value.split(",").map((category) => category.trim()),
  //   });
  // };

  // const handleClearCategories = () => {
  //   setProductData({ ...productData, categories: [] });
  // };

  const handleSubmit = async (values) => {
    console.log("productData in the form", values);
    // event.preventDefault();

    try {
      const mutationResponse = await updateProduct({
        variables: {
          _id: productId,
          product: values,
        },
      });
      console.log("mutationResponse", mutationResponse);
    } catch (err) {
      console.error(err);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const onFinishFailed = (values) => {
    console.log(`did not submit, values: ${values}`)
    window.alert('fail')
}

const onFinish = (values) => {
    console.log(`successfully added ${values}`)
    window.alert(`successfully added ${values.name}`)
}

  return (
    // <>
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
    //     <button type="submit">Update Product</button>
    //   </form>
    //   <hr />
    //   <h2>Product Data</h2>
    //   <h1>{product.name}</h1>
    //   <p>{product.description}</p>
    //   <p>Price: ${product.price}</p>
    //   <p>Quantity: {product.quantity}</p>
    //   <h3>Category:</h3>
    //   {product.categories?.map((tag) => {
    //     return <div>{tag.name}</div>;
    //   })}
    //   <h3>Reviews:</h3>
    //   {product.reviews?.map((review) => {
    //     return <div>{review.reviewBody}</div>;
    //   })}
    // </>
    <div >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          categories: product.categories,
          image: "",
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          name: product.name
        }}
        onFinish={(values) => {
          handleSubmit(values)
          onFinish(values)
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Product name Required' }]}
        >
          <Input placeholder={product.name}/>
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: 'Product Description Required' }]}
        >
          <Input placeholder={product.description}/>
        </Form.Item>

        <Form.Item label="Image" name="image" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Quantity Required' }]}
        >
          <InputNumber placeholder={product.quantity}/>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Quantity Required' }]}
        >
          <InputNumber placeholder={product.price}/>
        </Form.Item>

        <Form.Item
          label="Category"
          name="categories"
        >
          <Input placeholder={product.categories} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Edit;
