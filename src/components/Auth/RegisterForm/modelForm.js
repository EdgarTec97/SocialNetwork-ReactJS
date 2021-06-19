import React from 'react';
import * as Yup from 'yup';

export default function modelForm(boolean = false) {
    if(!boolean) return {
        name: "",
        username: "",
        email: "",
        password: "",
        repetpassword: ""
    };
    return {
        name: Yup.string().required("El nombre es obligatorio"),
        username: Yup.string().matches(/^[a-zA-Z0-9-]*$/,"El nombre de usuario no puede contener espacios").required("El nombre de usuario es obligatorio"),
        email: Yup.string().email("El email no es valido").required("El correo es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repetpassword")],"Las contraseñas no son iguales"),
        repetpassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")],"Las contraseñas no son iguales")
    };
}