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
    category: Category
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
    admin: Boolean
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      name: String!
      email: String!
      password: String!
      admin: Boolean
    ): Auth
    addProduct(products: [ID]!): Product
    updateUser(name: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addReview(review: String): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
