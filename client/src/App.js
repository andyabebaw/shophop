import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Detail from "./pages/Detail";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import { StoreProvider } from "./utils/GlobalState";
// import { ApolloProvider } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>  
    <ApolloProvider client={client}> 
      <div>
      
        <StoreProvider> 
        <Nav />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/EditProduct" element={<EditProduct />} />
            <Route path="/products/:id" element={<Detail />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
        </StoreProvider>
      </div>
      </ApolloProvider>
    </>
  );
}

export default App;
