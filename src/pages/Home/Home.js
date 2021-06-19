import React from "react";
import useAuth from "../../hooks/useAuth";
import {Grid} from 'semantic-ui-react';
import Feed from "../../components/Home/Feed";
import UsersNotFolloweds from '../../components/Home/UsersNotFolloweds';
import './Home.scss';

export default function Home(){
    const auth = useAuth();
    return(
        <Grid className="home">
            <Grid.Column className="home_left" width={11}>
                <Feed />
            </Grid.Column>
            <Grid.Column className="home_right" width={5}>
                <UsersNotFolloweds />
            </Grid.Column>
        </Grid>
    );
}