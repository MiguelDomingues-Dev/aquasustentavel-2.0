import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './menuBar.css';
import { VscGraph } from "react-icons/vsc";
import { FaGear } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { HiOutlineSignal } from "react-icons/hi2";

export default function MenuBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Obtem a localização atual

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='containerMenu'>
            <p 
                className={location.pathname === '/aditionIot' ? 'active' : ''} 
                onClick={() => handleNavigation('/aditionIot')}
            >
                <HiOutlineSignal />
            </p>
            <p 
                className={location.pathname === '/overview' ? 'active' : ''} 
                onClick={() => handleNavigation('/overview')}
            >
                <IoHome />
            </p>
            <p 
                className={location.pathname === '/analytics' ? 'active' : ''} 
                onClick={() => handleNavigation('/analytics')}
            >
                <VscGraph />
            </p>
            <p 
                className={location.pathname === '/settings' ? 'active' : ''} 
                onClick={() => handleNavigation('/settings')}
            >
                <FaGear />
            </p>
        </div>
    );
}
