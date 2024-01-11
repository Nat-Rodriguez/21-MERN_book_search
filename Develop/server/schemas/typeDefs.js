const { gql } = require('@apollo/server');

const typeDefs = `
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    password: String!
  }

  type Book {
    bookId: String!
    _id: ID
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  input BookInput {
    authors: [String]
    description: String
    title: String!
    bookId: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookContent!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;