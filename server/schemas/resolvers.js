const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51Mzw9mK92Z1fiE1CekPRcxQuqnWoYxJ9eq5nyU2DmPuSzzqEm24fxw5ENagAziQCJPjnM5F53DVvwbqm9zhRW0Io00PsLIuc6Y"
);

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
    products: async (parent, { categoryID, name }) => {
      console.log("entered query products resolver");
      const params = {};

      if (categoryID) {
        params.categories = categoryID;
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
    updateProductReviews: async (_, { productId, reviewBody }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to create a review"
          );
        }

        const product = await Product.findById(productId);

        if (!product) {
          throw new UserInputError("Product not found");
        }

        const newReview = {
          reviewBody,
          userId: user._id,
        };

        // Add the new review to the product's reviews array
        await Product.updateOne(
          { _id: productId },
          { $push: { reviews: newReview } }
        );

        // Return the updated product document
        return await Product.findById(productId).populate("categories", "name");
      } catch (err) {
        console.error(err);
        throw new ApolloError(
          "Failed to update product reviews",
          "INTERNAL_SERVER_ERROR"
        );
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
    updateProduct: async (parent, updateProduct, context) => {
      if (context.user.isAdmin) {
        const product = await Product.findByIdAndUpdate(
          updateProduct._id,
          updateProduct.product,
          { new: true }
        ).populate("categories", "name");
        return product;
      }

      throw new AuthenticationError("Forbidden, You are not an admin");
    },
  },
};

module.exports = resolvers;
