const { Book, User } = require('../models');



const resolvers = {
  Query: {
    book: async () => {
      try {
        const books = await Book.find({});
        console.log("BOOK:",books)
        return books;
      } catch (error) {
        console.error('Error querying books:', error);
        throw new Error('Failed to retrieve books');
      }
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
  },
  Mutation: {
    addUser: async (_, args) => {
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