const { User, Product, Category } = require('../models');

const resolvers = {
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return { user }
        } 
    }
}

module.exports = resolvers;
