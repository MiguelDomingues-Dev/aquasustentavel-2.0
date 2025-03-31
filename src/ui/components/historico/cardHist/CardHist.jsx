import * as React from 'react';
import { BsThreeDots } from "react-icons/bs";

import './cardHist.css';

export default function CardHist() {
    return(
        <div className='containerCardHist'>
            <div className="infoConsumo">
                <p className='date'>30/03/2025</p>
                <p className='titleConsumo'>Consumo Total</p>
            </div>
            <div className="valueConsumo">1500L</div>
            <BsThreeDots 
                fontSize="1.5rem"
                cursor="Pointer"
            />
        </div>
    )
}