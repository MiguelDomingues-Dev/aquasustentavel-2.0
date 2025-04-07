import React, { useState, lazy, Suspense } from 'react';
import '../../ui/templates/dashboard/dashboard.css'
import Loading from "../../ui/components/Loading/index";

const SideBar = lazy(() => import('../../ui/components/sideBarMenu/SideBar'));
const NavBar = lazy(() => import('../../ui/components/navbar/NavBar'));
const DashboardWidget = lazy(() => import('../../ui/components/Graficos/Graficos'));

export default function Dashboard() {
    const [pageTitle, setPageTitle] = useState("Dashboard");

    // Função para alterar o título, por exemplo, ao clicar em um botão na sidebar
    const handleChangePage = (title) => {
        setPageTitle(title);
    };
    return(
        <Suspense fallback={<Loading />}> 
            <div className='contaneirDashboard'>
                <SideBar />
                <NavBar namePage={pageTitle} />
                <Suspense fallback={<Loading />}>
                    <div className='contaneirGraficos'>
                        <DashboardWidget />
                    </div>
                </Suspense>
            </div>
        </Suspense>
    );
}