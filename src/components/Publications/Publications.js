import React from 'react';
import {Grid} from 'semantic-ui-react';
import PreviewPublication from './PreviewPublication/PreviewPublication';
import './Publications.scss';

export default function Publications(props) {
    const {publications} = props;
    return (
        <div className="publications">
            <h1>Publicaciones</h1>
            <Grid columns={5} className="grid_publication">
                {publications.map((publication,index)=>(
                    <Grid.Column key={index}>
                        <PreviewPublication publication={publication} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}
