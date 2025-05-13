import React, { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { MdWaterDrop } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, off } from "firebase/database";
import "./cards.css";

export default function Cards() {
  const [fluxoLps, setFluxoLps]       = useState(0);   // litros / segundo
  const [consumoTotal, setConsumo]    = useState(0);   // litros
  const [mediaHoje, setMediaHoje]     = useState(0);   // litros

  useEffect(() => {
    const auth = getAuth();
    const db   = getDatabase();

    /* espera autenticação */
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      /* ---- Listener em /dados ---- */
      const dadosRef = ref(db, `usuarios/${user.uid}/dados`);
      const unsubDados = onValue(dadosRef, (snap) => {
        const d = snap.val() || {};
        setFluxoLps(d.fluxo_lps || 0);
        setConsumo(d.consumo_L || 0);
      });

      /* ---- Listener em /historicoHoje ---- */
      const histRef = ref(db, `usuarios/${user.uid}/historicoHoje`);
      const unsubHist = onValue(histRef, (snap) => {
        const obj = snap.val() || {};

        // obj = { Sun: 12.5, Mon: 8.1, ... }  → média dos valores != 0
        const vals = Object.values(obj).filter((v) => typeof v === "number");
        const media = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
        setMediaHoje(media);
      });

      /* cleanup quando usuário sai */
      return () => {
        off(dadosRef);
        off(histRef);
      };
    });

    return () => unsubAuth();
  }, []);

  /* conversão p/ L/min:  1 L/s = 60 L/min */
  const fluxoLmin = (fluxoLps * 60).toFixed(2);

  return (
    <div className="containerCard">
      {/* Fluxo */}
      <Card
        sx={{
          backgroundColor: "rgba(0, 178, 27, 0.69)",
          color: "white",
          p: 2,
          width: { xs: "90%", sm: "300px" },
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Fluxo de Água</Typography>
        <Typography variant="h4" fontWeight="bold">
          {fluxoLmin} L/min
        </Typography>
      </Card>

      {/* Consumo total */}
      <Card
        sx={{
          backgroundColor: "rgba(9, 132, 193, 0.49)",
          color: "white",
          p: 2,
          width: { xs: "90%", sm: "300px" },
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          <MdWaterDrop /> Consumo Total
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {consumoTotal.toFixed(2)} L
        </Typography>
      </Card>

      {/* Média do histórico de hoje */}
      <Card
        sx={{
          backgroundColor: "rgba(9, 132, 193, 0.49)",
          color: "white",
          p: 2,
          width: { xs: "90%", sm: "300px" },
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          <MdWaterDrop /> Média do Histórico de Hoje
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {mediaHoje.toFixed(2)} L
        </Typography>
      </Card>
    </div>
  );
}
