import React from 'react'
import * as Yup from 'yup';

export default function modelPasswordForm(params=false) {
    if (!params) return {
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    };
    return {
        currentPassword: Yup.string().required(),
        newPassword: Yup.string().required().oneOf([Yup.ref('repeatPassword')]),
        repeatPassword: Yup.string().required().oneOf([Yup.ref('newPassword')])
    };
}
