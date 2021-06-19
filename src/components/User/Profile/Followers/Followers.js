import React,{useState,useEffect} from 'react'
import {useQuery} from '@apollo/client';
import {GET_FOLLOWERS,GET_FOLLOWEDS} from '../../../../gql/follow';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';
import './Followers.scss';

export default function Followers(props) {
    const {username,publications} = props;
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);
    const {data,loading,error, startPolling, stopPolling} = useQuery(GET_FOLLOWERS,{
        variables: {username}
    });
    const {data: dataFolloweds,loading: loadingFolloweds,error:errorFolloweds, startPolling:startPollingF, stopPolling:stopPollingF} = useQuery(GET_FOLLOWEDS,{
        variables: {username}
    });
    useEffect(()=>{
        startPolling(1000);
        startPollingF(1000);
        return () => {
            stopPolling();
            stopPollingF();
        }
    },[startPolling,stopPolling,startPollingF,stopPollingF]);

    const openFollowers = () => {
        setTitle("Seguidores");
        setShowModal(true);
        setChildrenModal(<ListUsers users={data.getFollowers} setShowModal={setShowModal}/>);
    }

    const openFolloweds = () => {
        setTitle("seguidos");
        setShowModal(true);
        setChildrenModal(<ListUsers users={dataFolloweds.getFolloweds} setShowModal={setShowModal}/>);
    }

    if(loading || error || loadingFolloweds || errorFolloweds) return null;
    return (
        <>
            <div className="followers">
                <p><strong>{publications}</strong> publicaciones</p>
                <p className="Link" onClick={openFollowers}><strong>{data.getFollowers.length}</strong> seguidores</p>
                <p className="Link" onClick={openFolloweds}><strong>{dataFolloweds.getFolloweds.length}</strong> seguidos</p>
            </div>
            <ModalBasic show={showModal} setShow={setShowModal} title={title} >
                {childrenModal}
            </ModalBasic>
        </>
    )
}
