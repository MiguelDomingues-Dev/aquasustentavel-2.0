import * as React from 'react';
import "./changeCriar&Entrar.css";
import { useNavigate } from 'react-router-dom';

export default function EntrarAccount() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return(
        <p onClick={handleClick} className='changeEntCre'>Entrar na Conta</p>
    )
}