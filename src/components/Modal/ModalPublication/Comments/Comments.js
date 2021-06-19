import React,{useEffect} from 'react'
import {useQuery} from '@apollo/client';
import {GET_COMMENTS} from '../../../../gql/comment';
import { Link } from 'react-router-dom';
import {Image} from 'semantic-ui-react';
import ImageNoFound from '../../../../assets/png/avatar.png';
import './Comments.scss';

export default function Comments(props) {
    const {idPublication} = props
    const {data, loading, startPolling,stopPolling} = useQuery(GET_COMMENTS,{
        variables:{
            idPublication
        }
    });
    useEffect(() => {
        startPolling(1000);
        return () => {
            startPolling();
        }
    }, [startPolling,stopPolling])
    if(loading) return null;
    return (
        <div className="comments">
            {data.getComments.map((comment,index) => (
                <Link key={index} to={`/${comment.idUser.username}`} className="comment">
                    <Image src={comment.idUser.avatar || ImageNoFound }/>
                    <div>
                        <p>{comment.idUser.username}</p>
                        <p>{comment.comment}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
