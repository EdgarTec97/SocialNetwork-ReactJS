import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import './UserNotFound.scss';

export default function UserNotFound() {
    return (
        <div className="user-not-found">
            <p>Usuario no encontrado</p>
            <p>Es posible que has seguido sea incorrecto o que la cuenta esté dada de baja</p>
            <Link to="/">Volver al inicio <Icon name="home" /></Link>
        </div>
    );
}