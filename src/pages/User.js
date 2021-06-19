import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Profile from '../components/User/Profile';
import {useQuery} from '@apollo/client';
import {GET_PUBLICATION} from '../gql/publication';
import Publications from '../components/Publications';

export default function User(){
    const {username} = useParams();
    const {data,loading, startPolling, stopPolling} = useQuery(GET_PUBLICATION,{
        variables:{ username }
    });
    useEffect(() => {
        startPolling(1000);
        return () =>{
            stopPolling();
        }
    }, [startPolling,startPolling])
    if(loading) return null;
    return (
        <>
            <Profile username={username} publications={data.getPublications.length}/>
            <Publications publications={data.getPublications}/>
        </>
    );
}