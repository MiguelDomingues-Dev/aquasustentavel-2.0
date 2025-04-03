import * as React from "react";
import { BsThreeDots } from "react-icons/bs";
import "./cardHist.css";

export default function CardHist({ date, consumption }) {
    return (
        <div className="containerCardHist">
                <div className="infoConsumo">
                    <p className="date">{date}</p>
                    <p className="titleConsumo">Consumo Total</p>
                </div>
            <div className="valueConsumo">{consumption}L</div>
            <BsThreeDots fontSize="1.5rem" cursor="Pointer" />
        </div>
    );
}
