import { useMutation } from "@apollo/client";
import { Col, Row } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUser from "../components/CreateUser";
import LoginBox from "../components/Login";
import { AuthContext } from "../utils/context/authContext";
import { LOGIN } from "../utils/mutations";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const authContext = useContext(AuthContext);
  // const [loginAPI, { error }] = useMutation(LOGIN);
  // const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const mutationResponse = await loginAPI({
  //       variables: { email: email, password: password },
  //     });
  //     // console.log(mutationResponse);
  //     const token = mutationResponse.data.login.token;
  //     navigate("/");
  //     authContext.login(token);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label htmlFor="email">Email:</label>
  //       <input
  //         type="email"
  //         id="email"
  //         name="email"
  //         value={email}
  //         onChange={(event) => setEmail(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="password">Password:</label>
  //       <input
  //         type="password"
  //         id="password"
  //         name="password"
  //         value={password}
  //         onChange={(event) => setPassword(event.target.value)}
  //       />
  //     </div>
  //     <button type="submit">Login</button>
  //     {error && ( // show error message if error state is not null
  //       <div style={{ background: "red", color: "white", padding: "10px" }}>
  //         <span style={{ marginRight: "5px" }}>!</span>
  //         {error.message}
  //       </div>
  //     )}
  //   </form>
  // );
};

export default Login;
