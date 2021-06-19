import React, {useState} from 'react';
import {Container, Image} from 'semantic-ui-react';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm';
import instaclone from '../../assets/png/instaclone.png';
import "./Auth.scss";

export default function Auth(){
    const [showLogin,setShowLogin] = useState(true);
    return (
        <Container fluid className="auth">
            <img src={instaclone}></img>

            <div className="container-form">
            {showLogin ? (
                    <>
                        <LoginForm />
                    </>
                ) : (
                    <>
                       <RegisterForm setShowLogin={setShowLogin}/>
                    </>
                )}
            </div>
            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            ¿No tienes cuenta?<br></br>
                            <span onClick={()=>setShowLogin(!showLogin)}>Registrate</span>
                        </>
                    ) : (
                        <>
                            Entra con tu cuenta<br></br>
                            <span onClick={()=>setShowLogin(!showLogin)}>Iniciar Sesión</span>
                        </>
                    )}
                </p>
            </div>
        </Container>
    );
}