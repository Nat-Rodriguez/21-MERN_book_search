import React from 'react';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// Create an Apollo Client instance
const customHttpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',  // Replace with your GraphQL server endpoint
});

// Construct request middleware to handle authentication token
const customAuthLink = setContext((_, { headers }) => {
  // Retrieve the authentication token from your preferred storage (e.g., localStorage)
  const customToken = localStorage.getItem('custom_id_token');

  return {
    headers: {
      ...headers,
      authorization: customToken ? `Bearer ${customToken}` : '',
    },
  };
});

const customClient = new ApolloClient({
  // Set up the client with the authentication middleware
  link: customAuthLink.concat(customHttpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={customClient}>
      <Navbar /> 
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
