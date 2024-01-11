import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($/* your variables here */) {
    // Assuming loginUser mutation setup
    loginUser(/* your variables here */)
    // Add any additional data you want to retrieve
  }
`;

export const ADD_USER = gql`
  mutation AddUser($/* your variables here */) {
    // Assuming addUser mutation setup
    addUser(/* your variables here */)
    // Add any additional data you want to retrieve
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($/* your variables here */) {
    // Assuming saveBook mutation setup
    saveBook(/* your variables here */)
    // Add any additional data you want to retrieve
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($/* your variables here */) {
    // Assuming removeBook mutation setup
    removeBook(/* your variables here */)
    // Add any additional data you want to retrieve
  }
`;

// Export other mutations if needed
