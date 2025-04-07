import React, { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { MdWaterDrop } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { database } from "../../../services/firebase";


import './cards.css';

export default function Cards() {
    const [userData, setUserData] = useState(null);
    const [historico, setHistorico] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [fluxo, setFluxo] = useState(0);
    const [consumoTotal, setConsumoTotal] = useState(0);
    const auth = getAuth();
    const db = getDatabase();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = ref(db, `usuarios/${user.uid}/dados`);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    } else {
                        console.log("Nenhum dado encontrado para este usuário.");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                }
                
                // 🔹 Buscar histórico baseado na data atual
                const today = new Date().toISOString().split("T")[0]; // Exemplo: "2025-01-22"
                const historicoRef = ref(db, `historico/${user.uid}/${today}`);

                get(historicoRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setHistorico(snapshot.val());
                        } else {
                            console.log("Nenhum histórico encontrado para hoje.");
                        }
                    })
                    .catch((error) => console.error("Erro ao buscar histórico:", error));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, db]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="containerCard">
            <Card sx={{ backgroundColor: "rgba(0, 178, 27, 0.69)", color: "white", padding: 2, width: "300px", textAlign: "center" }}>
                <Typography variant="h6">Fluxo de Água</Typography>
                <Typography variant="h4" fontWeight="bold">{userData?.fluxo || 0} L/s</Typography>
            </Card>

            <Card sx={{ backgroundColor: "rgba(9, 132, 193, 0.49)", color: "white", padding: 2, width: "300px", textAlign: "center" }}>
                <Typography variant="h6"><MdWaterDrop /> Consumo Total</Typography>
                <Typography variant="h4" fontWeight="bold">{userData?.consumo || 0} L</Typography>
            </Card>

            <Card sx={{ backgroundColor: "rgba(9, 132, 193, 0.49)", color: "white", padding: 2, width: "300px", textAlign: "center" }}>
                <Typography variant="h6"><MdWaterDrop /> Histórico de Hoje</Typography>
                <Typography variant="h4" fontWeight="bold">{historico?.agua_medio || 0} L</Typography>
            </Card>
        </div>
    );
}
