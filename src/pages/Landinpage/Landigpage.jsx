import * as React from 'react';
import "../../ui/templates/landingpage/index.css";
import FunctionApp from '../../ui/section/functionApp/FunctionApp';
import InitialLand from '../../ui/section/initialLand/InitialLand';

export default function Landinpage() {
    return (
        <div className='containerLand'>
            <FunctionApp />
            <InitialLand />
        </div>
    );
}