import * as React from 'react';
import "./changeCriar&Entrar.css";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/forgot-password');
    }

    return(
        <p onClick={handleClick} className='changeEntCre'>Esqueci a senha</p>
    )
}