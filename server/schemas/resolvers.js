const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category } = require("../models");
const { signToken } = require("../utils/auth");

// "name": "jane",
// "email": "jane@gmail.com",
// "password": "test1234",
// "isAdmin": true

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.categories = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("categories");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("categories");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("error: ", error);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Incorrect email");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
        throw new AuthenticationError(error);
      }
    },
    addProduct: async (parent, newProduct, context) => {
      if (context.user.isAdmin) {
        console.log("🚀 newProduct", newProduct);
        const productDoc = await Product.create(newProduct.product);
        const product = await Product.findOne({ _id: productDoc._id })
          .populate("categories", "name")
          .exec();
        return product;
      }

      throw new AuthenticationError("Forbidden, You are not an admin");
    },
  },
};

module.exports = resolvers;
