import React, { lazy, Suspense } from 'react';
import { useMediaQuery } from '@mui/material';
import '../../ui/templates/overview/overview.css'
import Loading from "../../ui/components/Loading/index";

// Lazy load dos componentes
const SideBar = lazy(() => import('../../ui/components/sideBarMenu/SideBar'));
const HamburgerMenu = lazy(() => import('../../ui/components/menuHamburguer/MenuMobile')); // novo componente de menu hambúrguer
const NavBar = lazy(() => import('../../ui/components/navbar/NavBar'));
const Cards = lazy(() => import('../../ui/components/cards/Cards'));
const Historico = lazy(() => import('../../ui/components/historico/Historico'));
const DashboardSensor = lazy(() => import('../../ui/components/dashboardSensor/DashboardSensor'));

export default function Overview() {
  // Define o breakpoint para telas pequenas; por exemplo, abaixo de 768px será considerado mobile.
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Suspense fallback={<Loading />}>
      <div className='contaneirOverview'>
        {/* Renderiza o HamburgerMenu em telas pequenas, caso contrário, a SideBar */}
        {isMobile ? <HamburgerMenu /> : <SideBar />}
        <NavBar />
        
        <Suspense fallback={<Loading />}>
          <Cards />
        </Suspense>
        <div className='compoClimHist'>
          <Suspense fallback={<Loading />}>
            <Historico />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <DashboardSensor />
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}
