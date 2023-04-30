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
      quantity
      image
      categories {
        _id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($_id: ID!, $product: ProductDataInput) {
    updateProduct(_id: $_id, product: $product) {
      _id
      name
      description
      price
      quantity
      image
      categories {
        _id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT_REVIEWS = gql`
  mutation updateProductReviews($productId: ID, $reviewBody: String) {
    updateProductReviews(productId: $productId, reviewBody: $reviewBody) {
      _id
      name
      description
      image
      quantity
      price
      categories {
        _id
        name
      }
      reviews {
        _id
        userId
        reviewBody
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($_id: ID!) {
    deleteProduct(_id: $_id) {
      _id
    }
  }
`;
