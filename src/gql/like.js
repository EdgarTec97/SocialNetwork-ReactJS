import {gql} from '@apollo/client';

export const ADD_LIKE = gql`
    mutation addLike($idPublication: ID!){
        addLike(idPublication:$idPublication)
    
    }
`;

export const DELETE_LIKE = gql`
    mutation deleteLike($idPublication: ID!){
        deleteLike(idPublication:$idPublication)
    
    }
`;

export const IS_LIKE = gql`
   query isLike($idPublication: ID!){
      isLike(idPublication:$idPublication)
    
    }
`;

export const COUNT_LIKE = gql`
    query countLike($idPublication: ID!){
      countLike(idPublication:$idPublication)
    
    }
`;