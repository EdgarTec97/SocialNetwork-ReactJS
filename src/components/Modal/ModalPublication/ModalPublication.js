import React from 'react'
import {Modal, Grid,Image} from 'semantic-ui-react';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Actions from './Actions';
import './ModalPublication.scss';

export default function ModalPublication(props) {
    const {show,setShow, publication} = props;
    const onClose = () =>  setShow(false);
    return (
        <Modal open={show} onClose={onClose} className="modal-publication" >
            <Grid>
                <Grid.Column className="moda-publication__left" width={10}>
                    <Image src={publication.file} />
                </Grid.Column>
                <Grid.Column className="moda-publication__right" width={6}>
                    <Comments idPublication={publication.id} />
                    <Actions publication={publication} />
                    <CommentForm publication={publication}/>
                </Grid.Column>
            </Grid>
        </Modal>
    )
}
