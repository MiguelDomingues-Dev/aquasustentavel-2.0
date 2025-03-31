import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { MdWaterDrop } from "react-icons/md";
import { ref, onValue } from "firebase/database"; // 🔹 Importando Firebase Database
import { database } from "../../../services/firebase"; // 🔹 Certifique-se que a importação do database está correta

import "./cards.css";

export default function Cards() {
    const [totalGasto, setTotalGasto] = useState(0);
    const [totalMensal, setTotalMensal] = useState(0);
    const [totalGeral, setTotalGeral] = useState(0);

    useEffect(() => {
        // Referência do nó no Realtime Database
        const totalGastoRef = ref(database, "consumo/totalGasto");
        const totalMensalRef = ref(database, "consumo/totalMensal");
        const totalGeralRef = ref(database, "consumo/totalGeral");

        // 🔹 Escuta mudanças no banco de dados em tempo real
        onValue(totalGastoRef, (snapshot) => {
            if (snapshot.exists()) {
                setTotalGasto(snapshot.val());
            }
        });

        onValue(totalMensalRef, (snapshot) => {
            if (snapshot.exists()) {
                setTotalMensal(snapshot.val());
            }
        });

        onValue(totalGeralRef, (snapshot) => {
            if (snapshot.exists()) {
                setTotalGeral(snapshot.val());
            }
        });

    }, []); // 🔹 Executa apenas na montagem do componente

    return (
        <div className="containerCard">
            <Card sx={{ backgroundColor: "rgba(0, 178, 27, 0.69)", color: "white", padding: 2, width: "300px", textAlign: "center" }}>
                <Typography variant="h6">Total Gasto R$/L</Typography>
                <Typography variant="h4" fontWeight="bold">{totalGasto}L</Typography>
                <Typography variant="body2">+35% desde o último mês</Typography>
            </Card>

            <Card sx={{ backgroundColor: "rgba(9, 132, 193, 0.49)", color: "white", padding: 2, width: "300px", textAlign: "center" }}>
                <Typography variant="h6"><MdWaterDrop /> Total Gasto Mensal</Typography>
                <Typography variant="h4" fontWeight="bold">{totalMensal}L</Typography>
                <Typography variant="body2">+35% desde o último mês</Typography>
            </Card>

            <Card sx={{ backgroundColor: "rgba(9, 132, 193, 0.49)", color: "white", padding: 2, width: "300px", textAlign: "center" }}>
                <Typography variant="h6"><MdWaterDrop /> Total Gasto</Typography>
                <Typography variant="h4" fontWeight="bold">{totalGeral}L</Typography>
                <Typography variant="body2">+35% desde o último mês</Typography>
            </Card>
        </div>
    );
}
