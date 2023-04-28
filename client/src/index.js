import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./utils/apolloClient";
import { AuthProvider } from "./utils/context/authContext";
import { ProductProvider } from "./utils/context/productContext";

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
