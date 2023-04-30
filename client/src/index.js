
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./utils/apolloClient";
import { AuthProvider } from "./utils/context/authContext";
import { ProductProvider } from "./utils/context/productContext";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);



root.render(
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
  </ApolloProvider>
);
