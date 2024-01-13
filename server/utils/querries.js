import {gql} from '@appollp/client';

export const GET_ME = gql`
    qyery me {
        _id
        username
        email
        password
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;