import React, {useState} from 'react'
import {Icon} from 'semantic-ui-react';
import {useQuery,useMutation} from '@apollo/client';
import {ADD_LIKE,DELETE_LIKE,IS_LIKE,COUNT_LIKE} from '../../../../gql/like';
import './Actions.scss';

export default function Actions(props) {
    const {publication} = props;
    const [loadingAction, setLoadingAction] = useState(false);
    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);
    const {data,loading, refetch} = useQuery(IS_LIKE,{
        variables: {
            idPublication: publication.id
        }
    });
    const {data: dataC,loading: loadingC,refetch: refetchC} = useQuery(COUNT_LIKE, {
        variables:{
            idPublication: publication.id
        }
    });
    const onAddLike = async () => {
        setLoadingAction(true);
        try {
            await addLike({
                variables: {
                    idPublication: publication.id
                }
            });
            refetch();
            refetchC();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    } 
    const onDeleteLike = async () => {
        setLoadingAction(true);
        try {
            await deleteLike({
                variables: {
                    idPublication: publication.id
                }
            });
            refetch();
            refetchC();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }
    const onAction = () => {
        if(!loadingAction){
            if(data.isLike){
                onDeleteLike();
            }else{
                onAddLike();
            }
        }
    }
    if(loading || loadingC) return null;
    return (
        <div className="actions">
            <Icon 
                className={data.isLike ? 'live-active' : 'Like'}
                name={data.isLike ? 'heart' : 'heart outline'}
                onClick={onAction}
            />
            {dataC.countLike} Me gusta
        </div>
    )
}
