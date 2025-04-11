import React, { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { MdWaterDrop } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { database } from "../../../services/firebase";
import './cards.css';

export default function Cards() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, `usuarios/${user.uid}`);
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
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, db]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Calcula a média dos valores de "historicoHoje", se existir
  let mediaHistorico = 0;
  if (userData && userData.historicoHoje && userData.historicoHoje.length > 0) {
    const total = userData.historicoHoje.reduce((acc, cur) => acc + cur.valor, 0);
    mediaHistorico = (total / userData.historicoHoje.length).toFixed(2);
  }

  return (
    <div className="containerCard">
      <Card 
        sx={{ 
          backgroundColor: "rgba(0, 178, 27, 0.69)", 
          color: "white", 
          padding: 2, 
          width: { xs: "90%", sm: "300px" }, 
          textAlign: "center" 
        }}
      >
        <Typography variant="h6">Fluxo de Água</Typography>
        <Typography variant="h4" fontWeight="bold">
          {userData?.fluxoAtual || 0} L/min
        </Typography>
      </Card>

      <Card 
        sx={{ 
          backgroundColor: "rgba(9, 132, 193, 0.49)", 
          color: "white", 
          padding: 2, 
          width: { xs: "90%", sm: "300px" }, 
          textAlign: "center" 
        }}
      >
        <Typography variant="h6">
          <MdWaterDrop /> Consumo Total
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {userData?.consumoTotal || 0} L
        </Typography>
      </Card>

      <Card 
        sx={{ 
          backgroundColor: "rgba(9, 132, 193, 0.49)", 
          color: "white", 
          padding: 2, 
          width: { xs: "90%", sm: "300px" }, 
          textAlign: "center" 
        }}
      >
        <Typography variant="h6">
          <MdWaterDrop /> Média do Histórico de Hoje
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {mediaHistorico} L
        </Typography>
      </Card>
    </div>
  );
}
