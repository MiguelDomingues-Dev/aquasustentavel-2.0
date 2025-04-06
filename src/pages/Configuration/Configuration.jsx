import React, { useState, lazy, Suspense } from 'react';
import '../../ui/templates/settings/settings.css'
import Loading from "../../ui/components/Loading/index";

const SideBar = lazy(() => import('../../ui/components/sideBarMenu/SideBar'));
const NavBar = lazy(() => import('../../ui/components/navbar/NavBar'));
const ProfileConfig = lazy(() => import('../../ui/components/configurarPerfil/ConfigurarPerfil'));

export default function Overview() {
    const [pageTitle, setPageTitle] = useState("Configuração");

    // Função para alterar o título, por exemplo, ao clicar em um botão na sidebar
    const handleChangePage = (title) => {
        setPageTitle(title);
    };
    return(
        <Suspense fallback={<Loading />}> 
            <div className='contaneirSettings'>
                <SideBar />
                <NavBar namePage={pageTitle} />
                <Suspense fallback={<Loading />}>
                    <div className='containerConfigUser'>
                        <ProfileConfig />
                    </div>
                </Suspense>
            </div>
        </Suspense>
    );
}