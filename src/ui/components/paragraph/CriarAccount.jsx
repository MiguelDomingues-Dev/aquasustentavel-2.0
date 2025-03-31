import * as React from 'react';
import "./changeCriar&Entrar.css";
import { useNavigate } from 'react-router-dom';

export default function CriarAccount() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register');
    }

    return(
        <p onClick={handleClick} className='changeEntCre'>Criar Conta</p>
    )
}