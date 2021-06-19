import React, { useState, useCallback } from "react";
import { Modal, Icon, Button, Dimmer, Loader, Image } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../../gql/publication";
import "./ModalUpload.scss";

export default function ModalUpload(props) {
  const { show, setShow } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };
    const onPublish = async() => {
        try {
            setIsLoading(true);
            const result = await publish({
                variables: {
                  file: fileUpload.file,
                },
            });
            const {data} = result;
            if(data.publish.status){
                toast.success("Se ha subido correctamente tu publicación");
                onClose();
            }else{
                toast.warning("Error al subir la publicación");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error al subir la publicación");
        }
    }
    return(
        <Modal size="small" open={show} onClose={onClose} className="modal-upload">
            <div {...getRootProps()} className="dropzone" style={fileUpload && {border:0}}>
                {!fileUpload && (
                    <>
                        <Icon name="cloud upload"/>
                        <p>Arrastra tu foto o vídeo que quieras publicar</p>
                    </>
                )}
                <input {...getInputProps()}/>
            </div>
            {fileUpload?.type === 'image' && (
                <div className="image"> 
                    <Image src={fileUpload.preview}/>
                </div>
            )}
            {fileUpload &&  (
                <Button className="btn-upload btn-action" onClick={onPublish}>Publicar</Button>
            )}
            {isLoading && (
                <Dimmer active className="publishing">
                    <Loader />
                    <p>Publicando</p>
                </Dimmer>
            )}
        </Modal>
    );
}