import React from 'react'
import { Button } from 'semantic-ui-react';
import useAuth from '../../../../hooks/useAuth';
import {useQuery,useMutation} from '@apollo/client';
import {IS_FOLLOW,UN_FOLLOW,FOLLOW} from '../../../../gql/follow';
import './HeaderProfile.scss';

export default function HeaderProfile(props) {
    const {user,handlerModal} = props;
    const {auth} = useAuth();
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UN_FOLLOW);
    const {data,loading,error, refetch} = useQuery(IS_FOLLOW,{
        variables: {username: user.username}
    });
    if(loading || error) return null;
    const buttonFollow = () => {
        if(data.isFollow){
            return (
                <Button className="btn-danger" onClick={onUnFollow}>Dejar de seguir</Button>
            );
        }
        return (
            <Button className="btn-action" onClick={onFollow}>seguir</Button>
        );
    };
    const onFollow = async() => {
        try {
            await follow({
                variables: {
                    username: user.username
                }
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }
    const onUnFollow = async() => {
        try {
            await unFollow({
                variables: {
                    username: user.username
                }
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="header-profile">
            <h2>{user.username}</h2>
            {user.username === auth.username ?(
                <Button onClick={()=> handlerModal("settings")}>Ajustes</Button>
            ) : (

                !loading && buttonFollow()
            )    
            }
        </div>
    )
}
