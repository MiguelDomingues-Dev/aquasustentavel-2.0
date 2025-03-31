import * as React from 'react';
import './sideBar.css';
import Header from './header/Header';
import MenuBar from './menu/MenuBar';
import FooterSideBar from './footer/Footer';

export default function SideBar() {
    return(
        <div className='sideBar'>
            <Header />
            <span className='separador'></span>
            <MenuBar />
            <span className='separador'></span>
            <FooterSideBar />
        </div>
    );
}