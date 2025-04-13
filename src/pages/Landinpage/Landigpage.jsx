import * as React from 'react';
import "../../ui/templates/landingpage/index.css";
import FunctionApp from '../../ui/section/functionApp/FunctionApp';
import InitialLand from '../../ui/section/initialLand/InitialLand';
import FeaturesSection from '../../ui/section/howFunction/HowFucntion';
import PrincingSection from '../../ui/section/planos/PlanoMensal';
import SobreNos from '../../ui/section/sobreNos/SobreNos';
import Contato from '../../ui/section/contact/Contato';
import Rodape from '../../ui/section/about/Rodape';

export default function Landinpage() {
    return (
        <div className='containerLand'>
            <FunctionApp />
            <InitialLand />
            <FeaturesSection />
            <PrincingSection />
            <SobreNos />
            <Contato />
            <Rodape />
        </div>
    );
}