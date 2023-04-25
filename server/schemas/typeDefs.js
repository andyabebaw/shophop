const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    categories: [Category]
    reviews: [Review]
  }

  type Review {
    _id: ID
    reviewBody: String
    userId: ID
  }

  type User {
    _id: ID
    name: String
    email: String
    isAdmin: Boolean
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductData {
    name: String
    description: String
    price: Float
    image: String
    quantity: Int
    categories: [ID]
  }

  type Query {
    user: User
    categories: [Category]
    products(categoryID: ID, name: String): [Product]
    product(_id: ID!): Product
  }

  type Mutation {
    addUser(
      name: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
    login(email: String!, password: String!): Auth
    updateUser(name: String, email: String, password: String): User
    addProduct(product: ProductData): Product
    updateProduct(_id: ID!, product: ProductData): Product
    updateProductReviews(productId: ID, reviewBody: String): Product
  }
`;

module.exports = typeDefs;
