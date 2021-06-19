import React,{useState} from 'react'
import {Image} from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication';
import './PreviewPublication.scss';

export default function PreviewPublication(props) {
    const {publication} = props;
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className="preview-publication" onClick={()=>setShowModal(true)}>
                <Image className="preview-publication__img" src={publication.file} />
            </div>
            <ModalPublication className="hidden-modal" show={showModal} setShow={setShowModal} publication={publication} />
        </>
    )
}
