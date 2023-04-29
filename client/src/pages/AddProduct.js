import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_PRODUCT } from "../utils/mutations";
import { Form, Input, Button, Upload, InputNumber, Space } from 'antd';
import {
    PlusOutlined
} from "@ant-design/icons";

const AddProduct = () => {

    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleSubmit = async (values) => {
        console.log("productData in the form", values);

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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[{ required: true, message: 'Product Description Required' }]}
                >
                    <Input />
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
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Quantity Required' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="categories"
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

export default AddProduct;
