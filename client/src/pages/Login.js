import { Col, Row } from "antd";
import React from "react";
import CreateUser from "../components/CreateUser";
import LoginBox from "../components/LoginBox";

const Login = () => {
  return (
    <div>
      <Row justify={"center"} align={"middle"}>
        <Col span={8}>
          <LoginBox />
        </Col>
        <Col span={8}>
          <CreateUser />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
