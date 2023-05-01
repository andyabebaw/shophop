import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Row, Col } from 'antd';
import ProductDropDown from "../components/ProductDropDown";
import Uploader from '../components/uploader/index';
import Axios from 'axios';

const AddProduct = (props) => {

    const [addProduct] = useMutation(ADD_PRODUCT);
    const [logo, setLogo] = useState('')
    const [imageUpload,] = useState({});
    const [, setImg] = useState({})

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
            console.error(err);
        }
    };

    const handleImg = (event) => {
        if (event.target.files[0]) {
            setImg({
                src: URL.createObjectURL(event.target.files[0]),
                alt: event.target.files[0].name
            });
            setLogo(event.target.files[0]);
        }
    }

    const upload = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "wdksrzb2")
        let data = "";
        await Axios.post(
            "https://api.cloudinary.com/v1_1/dbnrnwpje/image/upload",
            formData).then((response) => {
                data = response.data["secure_url"]
            })
        console.log(data)
        return data
    }

    const handleImageSubmit = async (event) => {
        imageUpload.image = logo;
        await upload(logo)
        return upload(logo)
    }

    const onFinishFailed = (values) => {
        console.log(`did not submit, values: ${values}`)
        window.alert('fail')
    }

    const onFinish = (values) => {
        console.log(`successfully added ${values}`)
        window.alert(`successfully added ${values.name}`)
    }

    return (
        <Row>
            <Col span={12} style={{ padding: "5vh" }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 500 }}
                    initialValues={{
                        categories: [],
                        image: ""
                    }}
                    onFinish={async (values) => {
                        const imageUrl = await handleImageSubmit()
                        if (imageUrl !== "") {
                            console.log(imageUrl)
                            values.image = imageUrl;
                            handleSubmit(values);
                            onFinish(values)
                        } else {
                            console.log('didnt work')
                        }
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

                    <Uploader imageUpload={handleImg} image={imageUpload.image} />

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
            </Col>
            <Col style={{ padding: "5vh" }}>

                <ProductDropDown ></ProductDropDown>

            </Col>
        </Row>
    )
};


export default AddProduct;
