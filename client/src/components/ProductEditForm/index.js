// import React, { useState} from 'react';
// import { Button, Form, Input, Upload } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// // import { CloudinaryImage } from "@cloudinary/url-gen";
// import { CloudConfig, URLConfig, CloudinaryImage} from "@cloudinary/url-gen";
// import { AdvancedImage } from '@cloudinary/react';

// import { fill } from "@cloudinary/url-gen/actions/resize";

// const onFinish = (values) => {
//     console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

// const normFile = (e) => {
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e?.fileList;
// };


// const CreateProduct = () => { 

//     let cloudConfig = new CloudConfig({cloudName: 'dtiagztwn'})
//     let urlConfig = new URLConfig({secure: true});
//     let myImage = new CloudinaryImage(cloudConfig, urlConfig);
    
//     myImage.resize(fill().width(200).height(250));

//     const [ image, setmyImage] = useState("")
//     const [ url, setUrl ] = useState("");
//     const uploadImage = () => { 
//     //   event.preventDefault();
//     // const files = document.querySelector(".upload-file");
//     //   const files = event.target.files
    
//       const formData = new FormData();
    
//       formData.append("file", image);
//       formData.append("upload_preset", "tkj0bcs9")
//       formData.append("cloud_name", "dtiagztwn")

//       fetch("https://api.cloudinary.com/v1_1/dtiagztwn/image/upload/", 
//       {
//           method: 'POST',
//           body: formData,
//       })
//       .then(resp => resp.json())
//       .then(formData => {
//         setUrl(formData.url)
//         if (Response.ok) {
//             document.location.replace("/");
//         } 
//         alert("Product Successfully Added");

//       })
//     .catch(err => console.log(err))

// }

//  return ( 
//     <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         style={{ maxWidth: 600 }}
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//     >

//         <Form.Item
//             label="Product Name"
//             name="productName"
//             rules={[{ required: true, message: 'Product name Required' }]}
//         >
//             <Input />
//         </Form.Item>

//         <Form.Item
//             label="Product Description"
//             name="productDescription"
//             rules={[{ required: true, message: 'Product Description Required' }]}
//         >
//             <Input />
//         </Form.Item>

//         <Form.Item className="upload-file" label="Upload" valuePropName="fileList" getValueFromEvent={normFile} type="file"
//         onChange= {(e)=> setmyImage(e.target.files[0])}
//         >
//             <Upload action="/" listType="picture-card">
//                 <div>
//                 <img src={url} alt=""/>
//                     <AdvancedImage cldImg={myImage} />
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//             </Upload>           
//         </Form.Item>

//         <Form.Item
//             label="Initial Quantity"
//             name="quantity"
//             rules={[{ required: true, message: 'Initial Quantity Required' }]}
//         >
//             <Input />
//         </Form.Item>

//         <Form.Item
//             label="Category"
//             name="categories"
//         >
//             <Input />
//         </Form.Item>

//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit" className="add-form" onClick={uploadImage} 
//             >               
//                 Add Product
//              </Button>
//             {/* <img src={url} alt=""/> */}
//         </Form.Item>
//     </Form>
//  )
// };
// export default CreateProduct;

