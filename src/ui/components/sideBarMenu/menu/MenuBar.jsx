import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menuBar.css';
import { VscGraph } from "react-icons/vsc";
import { FaGear } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { HiOutlineSignal } from "react-icons/hi2";

export default function MenuBar() {
    const navigate = useNavigate();
    const [active, setActive] = useState('/'); // Estado para rastrear a página ativa

    const handleNavigation = (path) => {
        setActive(path); // Atualiza o item ativo
        navigate(path); // Redireciona para a página correspondente
    };

    return (
        <div className='containerMenu'>
            <p 
                className={active === '/' ? 'active' : ''} 
                onClick={() => handleNavigation('/dashboard')}
            >
                <HiOutlineSignal />
            </p>
            <p 
                className={active === '/overview' ? 'active' : ''} 
                onClick={() => handleNavigation('/overview')}
            >
                <IoHome />
            </p>
            <p 
                className={active === '/dashboard' ? 'active' : ''} 
                onClick={() => handleNavigation('/analytics')}
            >
                <VscGraph />
            </p>
            <p 
                className={active === '/settings' ? 'active' : ''} 
                onClick={() => handleNavigation('/settings')}
            >
                <FaGear />
            </p>
        </div>
    );
}
