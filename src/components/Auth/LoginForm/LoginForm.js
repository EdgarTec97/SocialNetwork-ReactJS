import React,{useState} from 'react';
import {Form,Button} from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {useMutation} from '@apollo/client';
import {LOGIN} from '../../../gql/user';
import modelLogin from './modelLogin';
import {setToken,decodeToken} from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';
import './LoginForm.scss';

export default function LoginForm() {
    const [error,setError] = useState("");
    const [login] = useMutation(LOGIN);
    //AuthData de App.js
    const {setUser} = useAuth();
    

    const formik = useFormik({
        initialValues: modelLogin(),
        validationSchema: Yup.object(modelLogin(true)),
        onSubmit: async (formData) =>{
            setError("");
            try {
                const result = await login({
                    variables: {
                        input: formData
                    }
                });
                toast.success("Has iniciado sesión correctamente.");
                const {token} = result.data.login;
                setToken(token);
                setUser(decodeToken(token));
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            }
        }
    });
    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Entra para ver las fotos y vídeos de tus amigos</h2>
            <Form.Input 
                type="text"
                placeholder="Correo electrónico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input 
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password && true}
            />
            <Button type="submit" className="btn-submit">Iniciar Sesion</Button>
            {error && <div className="div-error"><p className="submit-error">{error}</p></div>}
        </Form>
    );
}