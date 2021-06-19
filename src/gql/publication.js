import {gql} from '@apollo/client';

export const PUBLISH = gql`
    mutation publish($file: Upload){
        publish(file:$file){
            status
            urlFile
        }
    }
`;

export const GET_PUBLICATION = gql`
    query getPublications($username: String!){
        getPublications(username: $username){
            id
            idUser{
              id
            }
            file
            typeFile
            createAt
            title
            description
            updateAt
        }
    }
`;

export const GET_PUBLICATION_FOLLOWEDS = gql`
    query getPublicationsFolloweds{
        getPublicationsFolloweds{
            id
            idUser{
                name
                username
                email
                avatar
            }
            file
            typeFile
            createAt
        }
    }
`;