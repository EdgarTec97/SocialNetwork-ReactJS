import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {REGISTER} from '../../../gql/user';
import modelForm from './modelForm';
import './RegisterForm.scss';

export default function RegisterForm(props){
    const {setShowLogin} = props;
    const [register] = useMutation(REGISTER)

    const formik = useFormik({
        initialValues: modelForm(),
        validationSchema: Yup.object(modelForm(true)),
        onSubmit: async (formValue) =>{
            try {
                const newUser = formValue;
                delete newUser.repetpassword;
                
                await register({
                    variables: {
                        input: newUser
                    }
                });
                toast.success("Se ha registrado tu cuenta correctamente.");
                setShowLogin(true);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Registrate para ver todas las novedades</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input 
                    type="text"
                    placeholder="Nombre completo"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="example@example.com"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Confirmar contraseña"
                    name="repetpassword"
                    onChange={formik.handleChange}
                    value={formik.values.repetpassword}
                    error={formik.errors.repetpassword && true}
                />
                <Button type="submit" className="btn-submit">Registrarse</Button>
            </Form>
        </>
    );
}