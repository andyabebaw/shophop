import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/authContext";
import { LOGIN } from "../../utils/mutations";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const [loginAPI, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const mutationResponse = await loginAPI({
        variables: { email: email, password: password },
      });
      const token = mutationResponse.data.login.token;
      navigate("/");
      authContext.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username Required" }]}
      >
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password Required" }]}
      >
        <Input.Password
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      {error && ( // show error message if error state is not null
        <div style={{ background: "red", color: "white", padding: "10px" }}>
          <span style={{ marginRight: "5px" }}>!</span>
          {error.message}
        </div>
      )}
    </Form>
  );
};

export default LoginBox;
