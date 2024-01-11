const { Book, User } = require('../models');



const resolvers = {
  Query: {
    book: async () => {
      return Book.find({});
    },
    user: async () => {
      return User.find({});
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },
    saveBook: async (_, { userId, bookId }) => {
      // Find the user based on userId
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found!');
      }

      // Find the book based on bookId
      const book = await Book.findById(bookId);

      if (!book) {
        throw new Error('Book not found!');
      }

      // Add the book to the user's savedBooks array
      user.savedBooks.push(book);
      await user.save();

      return user;
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {savedBooks: bookId}},
          {
            new: true,
            runValidators: true,
          });
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;