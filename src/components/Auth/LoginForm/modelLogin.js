import React from 'react';
import * as Yup from 'yup';

export default function modelLogin(params=false) {
    if (!params) return {
        email: '',
        password: ''
    };
    return {
        email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria")
    }
}