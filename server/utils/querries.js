import {gql} from '@appollp/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            password
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
        
    }
`;