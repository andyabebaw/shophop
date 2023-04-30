import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import { Form, Input, Button, Upload, InputNumber } from 'antd';
import {
    PlusOutlined
} from "@ant-design/icons";
import { CloudConfig, URLConfig, CloudinaryImage} from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import ProductDropDown from "../components/ProductDropDown";
import { useState } from "react";

const AddProduct = () => {
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
    
    //   const handleClearCategories = () => {
    //     setProductData({ ...productData, categories: [] });
    //   };

    let cloudConfig = new CloudConfig({cloudName: 'dtiagztwn'})
    let urlConfig = new URLConfig({secure: true});
    let myImage = new CloudinaryImage(cloudConfig, urlConfig);
    
    // myImage.resize(fill().width(200).height(250));
    // const [ image, setmyImage] = useState("")
    // const [ url, setUrl ] = useState("");

    const handleSubmit = async () => {
        console.log("productData in the form", productData);

        try {
            const mutationResponse = await addProduct({
                variables: {
                    product: productData,
                },
            });

            console.log(mutationResponse);
        } catch (err) {
            console.log('this is an error')
            console.error(err);
        }
    };

    const normFile = (e) => {
            const files = document.querySelector("[type=file]").files
      
            const formData = new FormData();
           for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append("file", file);
            formData.append("upload_preset", "tkj0bcs9")
            formData.append("cloud_name", "dtiagztwn")
      
            fetch("https://api.cloudinary.com/v1_1/dtiagztwn/image/upload", 
            {
                method: 'POST',
                body: formData,
            })
            .then((response) =>{
              return response.json();
            })
            .then(data => {
              console.log(data);
              let imageUrl = data.url;
              console.log(imageUrl);
            })
          }
      
        //   }
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
        <div >
            <div style = {{padding: "40px"}}>
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
                    onChange={handleInputChange}

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[{ required: true, message: 'Product Description Required' }]}
                    onChange={handleInputChange}

                >
                    <Input />
                </Form.Item>

                <Form.Item label="Image" name="image" getValueFromEvent={normFile} 
                                onChange={handleInputChange}
                                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <AdvancedImage cldImg={myImage} />
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
                   onChange={handleCategoryInputChange}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default AddProduct;
