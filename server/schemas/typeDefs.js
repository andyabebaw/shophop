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

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    name: String
    email: String
    isAdmin: Boolean
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductDataInput {
    name: String
    description: String
    price: Float
    image: String
    quantity: Int
    categories: [ID]
  }

  type Query {
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    categories: [Category]
    products(categoryName: String, name: String): [Product]
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
    addProduct(product: ProductDataInput): Product
    updateProduct(_id: ID!, product: ProductDataInput): Product
    deleteProduct(_id: ID!): Product
    updateProductReviews(productId: ID, reviewBody: String): Product
  }
`;

module.exports = typeDefs;
