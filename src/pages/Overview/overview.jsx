import * as React from 'react';
import '../../ui/templates/overview/overview.css'
import SideBar from '../../ui/components/sidebar/Sidebar';
import NavBar from '../../ui/components/navbar/NavBar';
import Cards from '../../ui/components/cards/Cards';
import Historico from '../../ui/components/historico/Historico';
import ClimaTempo from '../../ui/components/climaTempo/ClimaTempo';
import Tanque from '../../ui/components/tanque/Tanque';

export default function Overview() {
    return(
        <div className='contaneirOverview'>
            <SideBar />
            <NavBar />
            <Cards />
            <div className='compoClimHist'>
                <Historico />
                <ClimaTempo />
            </div>
            <Tanque />
        </div>
    );
}