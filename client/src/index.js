import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./utils/apolloClient";
import { AuthProvider } from "./utils/context/authContext";

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
