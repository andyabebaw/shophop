import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_PRODUCT } from "../utils/mutations";
import { QUERY_PRODUCT_ById } from "../utils/queries";
import { Form, Input, Button, InputNumber } from 'antd';

const Edit = () => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const productId = useParams().id;
  const { loading, data } = useQuery(QUERY_PRODUCT_ById, {
    variables: { id: productId },
  });
  const product = data?.product || {};

  console.log(product);

  const handleSubmit = async (values) => {
    console.log("productData in the form", values);

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

  const onFinishFailed = (values) => {
    console.log(`did not submit, values: ${values}`)
    window.alert('fail')
  }

  const onFinish = (values) => {
    console.log(`successfully added ${values}`)
    window.alert(`successfully added ${values.name}`)
  }

  return (
    <div style={{ padding: "5vh" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          categories: product.categories || [],
          image: product.image,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          name: product.name
        }}
        onFinish={async (values) => {
          handleSubmit(values);
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
          <Input placeholder={product.name} />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: 'Product Description Required' }]}
        >
          <Input placeholder={product.description} />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Quantity Required' }]}
        >
          <InputNumber placeholder={product.quantity} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Quantity Required' }]}
        >
          <InputNumber placeholder={product.price} />
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
