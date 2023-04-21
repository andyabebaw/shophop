const { User, Product, Category } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
