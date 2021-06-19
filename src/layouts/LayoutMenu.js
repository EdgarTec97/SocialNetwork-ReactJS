import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from '../components/Header';

export default function LayoutMenu(props){
    const {children} = props;
    return (
        <>
            <Header />
            <Container className="layout-basic">
                {children}
            </Container>
        </>
    );
}