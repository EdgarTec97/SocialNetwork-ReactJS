import React from 'react'
import {Form,Button} from 'semantic-ui-react';
import * as Yup from 'yup';
import {useForm, useFormik} from 'formik'; 
import {useMutation} from '@apollo/client';
import {UPDATE_USER} from '../../../gql/user';
import {toast} from 'react-toastify';
import modelPasswordForm from './modelPasswordForm';
import './PasswordForm.scss';

export default function PasswordForm(props) {
    const {setShowModal} = props;
    const [updateUser] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: modelPasswordForm(),
        validationSchema:  Yup.object(modelPasswordForm(true)),
        onSubmit: async (formValue) => {
            try {
                delete formValue.repeatPassword;
                const result = await updateUser({
                    variables:{
                        input: formValue
                    }
                });
                if(!result.data.updateUser){
                    toast.error("Error al actualizar la contraseña");
                }else{
                    toast.success("Se actualizó la contraseña correctamente");
                    setShowModal(false);
                }
            } catch (error) {
                toast.error(error);
            }
        }
    });
    return (
        <Form className="password-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                type="password"
                placeholder="Contraseña actual"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />
            <Form.Input 
                type="password"
                placeholder="Nueva Contraseña"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />
            <Form.Input 
                type="password"
                placeholder="Confirmar Contraseña nueva"
                name="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatPassword && true}
            />
            <Button type="submit" className="btn-submit">actualizar</Button>
        </Form>
    )
}
