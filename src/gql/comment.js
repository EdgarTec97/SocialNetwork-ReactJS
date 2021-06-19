import {gql} from '@apollo/client';

export const ADD_COMMENT= gql`
    mutation addComment($input: CommentInput){
        addComment(input: $input){
            id
            idPublication{
                id
            }
            idUser{
                id
            }
            comment
            createAt
            updateAt
        }
    }
`;

export const GET_COMMENTS= gql`
    query getComments($idPublication: String!){
        getComments(idPublication: $idPublication){
            id
            idPublication{
                id
            }
            idUser{
                id
                name
                username
                avatar
            }
            comment
            createAt
            updateAt
        }
    }
`;