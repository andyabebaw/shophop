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
    products: async (parent, { categoryName, name }) => {
      // console.log("entered query products resolver");
      const params = {};

      if (categoryName) {
        const categoryObj = await Category.findOne({ name: categoryName });
        if (categoryObj) {
          params.categories = categoryObj._id;
        }
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
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");
     console.log("teest fore stripe");
      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
        console.log(line_items);
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
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
        throw new AuthenticationError(error);
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
    
    addProduct: async (parent, addedProduct, context) => {
      if (context.user && context.user.isAdmin) {
        const { categories = [], ...otherDatas } = addedProduct.product;

        const categoryIds = [];

        // Save categories to the database only if there are any
        if (categories.length > 0) {
          const savedCategories = await Promise.all(
            categories.map(async (category) => {
              const categoryName = category.toLowerCase();
              const existingCategory = await Category.findOne({
                name: categoryName,
              });

              // Category already exists in the database
              if (existingCategory) {
                categoryIds.push(existingCategory._id);
              }
              // Else Create a new category
              else {
                const newCategory = new Category({ name: category });
                const savedCategory = await newCategory.save();
                categoryIds.push(savedCategory._id);
              }
            })
          );
        }

        const product = new Product({
          ...otherDatas,
          categories: categoryIds,
        });

        try {
          const newProductDoc = await product.save();
          const newProduct = await Product.findOne({ _id: newProductDoc._id })
            .populate("categories", "name")
            .exec();
          return newProduct;
        } catch (error) {
          console.log("error: ", error);
        }
      }

      throw new AuthenticationError("Forbidden, You are not an admin");
    },
    deleteProduct: async (parent, { _id }, context) => {
      console.log("entered mutation deleteProduct resolver");
      console.log(_id);
      const product = await Product.findOneAndDelete({ _id: _id })
        .then((err, docs) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`deleted product ${docs}`)
        }
      })
    },
    updateProduct: async (parent, { _id, product }, context) => {
      console.log("entered mutation updateProduct resolver");
      if (context.user.isAdmin) {
        // const product = await Product.findByIdAndUpdate(
        //   updateProduct._id,
        //   updateProduct.product,
        //   { new: true }
        // ).populate("categories", "name");
        // return product;

        console.log(_id);
        console.log(product);
        const {
          name,
          description,
          image,
          price,
          quantity,
          categories: categoriesToAdd,
        } = product;

        try {
          // Find the product by id
          const product = await Product.findById(_id);
          if (!product) {
            throw new Error("Product not found");
          }

          // Save categories to the database first
          const savedCategories = await Promise.all(
            categoriesToAdd.map(async (category) => {
              const categoryName = category.toLowerCase();
              const existingCategory = await Category.findOne({
                name: categoryName,
              });

              if (existingCategory) {
                // Category already exists in the database
                return existingCategory._id;
              } else {
                // Create a new category
                const newCategory = new Category({ name: category });
                const savedCategory = await newCategory.save();
                return savedCategory._id;
              }
            })
          );

          // // Add new categories to existing ones
          // const updatedCategories = product.categories.concat(savedCategories);
          // const uniqueIds = [...new Set(idArray.map((id) => id.toString()))];
          // console.log(updatedCategories);
          // console.log(uniqueIds);

          // Update the product
          const result = await Product.findByIdAndUpdate(
            _id,
            {
              name,
              description,
              image,
              price,
              quantity,
              categories: savedCategories,
            },
            { new: true } // Return the updated product instead of the old one
          ).populate("categories", "name");

          return result;
        } catch (error) {
          throw new Error(error.message);
        }
      }

      throw new AuthenticationError("Forbidden, You are not an admin");
    },
  },
};

module.exports = resolvers;
