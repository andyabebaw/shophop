import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./utils/apolloClient";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
