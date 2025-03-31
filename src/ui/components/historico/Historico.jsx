import * as React from 'react';
import HeaderHist from './headerHist/HeaderHist';
import BodyHist from './bodyHist/BodyHist';
import "./historico.css";

export default function Historico() {
    return (
        <div className='historioContainer'>
            <HeaderHist />
            <BodyHist />
        </div>
    );
}