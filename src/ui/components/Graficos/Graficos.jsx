import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from "recharts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../../../services/firebase";

export default function DashboardWidget() {
  const [data, setData] = useState([]);
  const [fluxo, setFluxo] = useState(0);
  const [consumoTotal, setConsumoTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(database, `usuarios/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const val = snapshot.val();
          if (val) {
            setFluxo(val.fluxoAtual || 0);
            setConsumoTotal(val.consumoTotal || 0);
            setData(val.historicoHoje || []);
          }
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="contaneirGraficos  rounded-xl scroll-container" style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "800px",  overflowY: "auto"  }}>
      
      {/* Card de informações gerais */}
      <div className="bg-gray-800 p-4 rounded-xl" style={{ color: "#fff", textAlign: "center" }}>
        <Typography variant="h6">Fluxo de Água</Typography>
        <Typography variant="h4" fontWeight="bold">{fluxo} L/min</Typography>
        <Typography variant="h6" mt={1}>Consumo Total</Typography>
        <Typography variant="h4" fontWeight="bold">{consumoTotal} L</Typography>
      </div>

      {/* Gráfico de Linha com scroll interno */}
      <div className="bg-gray-800 p-4 rounded-xl" style={{ color: "#fff", textAlign: "center", maxHeight: "320px" }}>
        <Typography variant="h6" className="text-xl font-bold mb-2">Gráfico de Linha</Typography>
        <div style={{ minWidth: "600px", height: "250px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
              <XAxis dataKey="hora" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras com scroll interno */}
      <div className="bg-gray-800 p-4 rounded-xl" style={{ color: "#fff", textAlign: "center", maxHeight: "320px"}}>
        <Typography variant="h6" className="text-xl font-bold mb-2">Gráfico de Barras</Typography>
        <div style={{ minWidth: "600px", height: "250px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="hora" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="valor" fill="#00B21B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
