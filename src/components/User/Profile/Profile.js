import React, {useState} from 'react';
import {Grid,Image} from 'semantic-ui-react';
import {useQuery} from '@apollo/client';
import {GET__USER} from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';
import ImageNoFound from '../../../assets/png/avatar.png';
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic/ModalBasic';
import AvatarForm from '../AvatarForm';
import HeaderProfile from './HeaderProfile';
import SettingsForm from '../SettingsForm';
import Followers from './Followers';
import './Profile.scss';

export default function Profile(props){
    const {username,publications} = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);
    const {auth} = useAuth();
    const {data,loading,error,refetch} = useQuery(GET__USER,{
        variables: {username: username}
    });
    if(loading) return null
    if(error) return <UserNotFound />
    const {getUser} = data;
    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil");
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
                setShowModal(true);
                break;
            case "settings":
                setTitleModal("Configuración de tu cuenta");
                setChildrenModal(<SettingsForm 
                                    setShowModal={setShowModal} 
                                    auth={auth} 
                                    getUser={getUser}
                                    setTitleModal={setTitleModal} 
                                    setChildrenModal={setChildrenModal}
                                    refetch={refetch}
                                />);
                setShowModal(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar onClick={() => username === auth.username && handlerModal("avatar")}/>
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <HeaderProfile user={getUser} handlerModal={handlerModal}/>
                    <Followers username={getUser.username} publications={publications} />
                    <div className="other">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} className="siteWeb" target="_blank">{getUser.siteWeb}</a>
                        )}
                        {getUser.description && (
                            <p className="description">{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
    );
}