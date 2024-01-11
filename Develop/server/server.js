const express = require('express');
const { ApolloServer } = require('@apollo/server'); 

// Import ApolloServer and expressMiddleware
const path = require('path');

// Imports the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');
const { expressMiddleware } = require('@apollo/server/express4');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply Apollo Server as middleware to the Express app
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
  });
});