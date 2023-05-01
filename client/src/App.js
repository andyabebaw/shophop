import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
// import CartIcon from "./components/CartIcon";
import Nav from "./components/Nav";
import AddProduct from "./pages/AddProduct";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { StoreProvider } from './utils/GlobalState';
import { setContext } from '@apollo/client/link/context';


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
    <ApolloProvider client={client}>

    <div>
    <StoreProvider>

      <Nav />
      {/* <CartIcon /> */}
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      
    </StoreProvider>
 </div>

    </ApolloProvider>

  );
}

export default App;
