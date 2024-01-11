import {gql} from '@appollp/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: string, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    authors
                    description
                    title
                    bookId
                    image
                    link
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookContent!) {
        saveBook(input: $BookContent) {
            _id
            username
            email
            savedBooks {
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            user {
                _id
                username
                email
                savedBooks {
                    authors
                    description
                    title
                    bookId
                    image
                    link
                }
            }
        }
    }
`;