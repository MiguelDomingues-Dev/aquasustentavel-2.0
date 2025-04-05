import React, { useState, lazy, Suspense } from 'react';
import '../../ui/templates/overview/overview.css'
import Loading from "../../ui/components/Loading/index";

const SideBar = lazy(() => import('../../ui/components/sideBarMenu/SideBar'));
const NavBar = lazy(() => import('../../ui/components/navbar/NavBar'));
const Cards = lazy(() => import('../../ui/components/cards/Cards'));
const Historico = lazy(() => import('../../ui/components/historico/Historico'));
const ClimaTempo = lazy(() => import('../../ui/components/climaTempo/ClimaTempo'));


export default function Overview() {
    return(
        <Suspense fallback={<Loading />}> 
            <div className='contaneirOverview'>
                <SideBar />
                <NavBar />
                <Suspense fallback={<Loading />}>
                    <Cards />
                </Suspense>
                <div className='compoClimHist'>
                    <Suspense fallback={<Loading />}>
                        <Historico />
                    </Suspense>
                    <Suspense fallback={<Loading />}>
                        <ClimaTempo />
                    </Suspense>
                </div>
            </div>
        </Suspense>
    );
}