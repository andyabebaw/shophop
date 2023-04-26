import React from "react";
import LoginBox from '../components/Login';
import CreateUser from '../components/CreateUser';
import { Col, Row } from 'antd';

const Login = () => {
  return <div>
    <Row justify={'center'} align={'middle'}>
      <Col span={8}>
        <LoginBox />
      </Col>
      <Col span={8}>
        <CreateUser />
      </Col>
    </Row>
  </div>;
};

export default Login;
