import React from 'react';
import { Button, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const CreateUser = () => (
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name Required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Username Required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password Required' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Create New User
            </Button>
        </Form.Item>
    </Form>
);

export default CreateUser;

