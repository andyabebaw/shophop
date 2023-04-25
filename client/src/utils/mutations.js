import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $password: String!
    $isAdmin: Boolean
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      isAdmin: $isAdmin
    ) {
      token
      user {
        _id
        name
        email
        isAdmin
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        isAdmin
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($product: ProductDataInput!) {
    addProduct(product: $product) {
      _id
      name
      description
      price
      image
      quantity
      categories {
        _id
        name
      }
    }
  }
`;
