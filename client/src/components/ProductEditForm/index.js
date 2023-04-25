import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const CreateProduct: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >

        <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: 'Product ame Required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Product Description"
            name="productDescription"
            rules={[{ required: true, message: 'Product Description Required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>
        </Form.Item>

        <Form.Item
            label="Initial Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Initial Quantity Required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Category"
            name="categories"

        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Create New User
            </Button>
        </Form.Item>
    </Form>
);

export default CreateProduct;
