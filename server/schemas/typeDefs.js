const { gql } = require('apollo-server-express');

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

  type User {
    _id: ID
    name: String
    email: String
    admin: Boolean
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
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addProduct(products: [ID]!): Product
    updateUser(name: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addReview(review: String)
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
