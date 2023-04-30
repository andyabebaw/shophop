import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import React, { useState, createRef } from "react";
import { Form, Input, Button, Upload, InputNumber, Space } from 'antd';
import {
    PlusOutlined
} from "@ant-design/icons";
import ProductDropDown from "../components/ProductDropDown";
import Uploader from '../components/uploader/index';
import Axios from 'axios';

// import { v2 as cloudinary } from 'cloudinary';
// import * as dotenv from 'dotenv';
// dotenv.config()
// import { Avatar, Button as MuiButton } from "@material-ui/core";
// import DeleteIcon from '@mui/icons-material/Delete';
// import UploadIcon from '@mui/icons-material/Upload';
// import { spacing } from '@material-ui/system';
// import styled from "styled-components"



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


    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        console.log()
        return e?.fileList;
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
        return data
    }

    const handleImageSubmit = async (event) => {
        imageUpload.image = logo;
        await upload(logo)
    }


    const [image, _setImage] = useState();
    const inputFileRef = createRef();
    const cleanup = () => {
        URL.revokeObjectURL(image && props.image);
        inputFileRef.current.value = null;
    };
    const setImage = (newImage) => {
        if (image) {
            cleanup()
        }
        _setImage(newImage)
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
        <div >
            <div style={{ padding: "40px" }}>
                <ProductDropDown ></ProductDropDown>
            </div>
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

                {/* <Form.Item label="Image" name="image" getValueFromEvent={normFile}>
                    <Upload action={(file) => { console.log(file) }} listType="picture-card" >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item> */}

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

            <Uploader imageUpload={handleImg} image={imageUpload.image}/>
            <Button onClick={(e) => handleImageSubmit(e)}> upload</ Button>
        </div >
    )
};


export default AddProduct;
