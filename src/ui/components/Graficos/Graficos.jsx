import React, { useEffect, useState } from "react";
import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "../../../services/firebase";

export default function DashboardWidget() {
  const [data, setData] = useState([]);
  const [totalUsage, setTotalUsage] = useState(0);
  const [averageUsage, setAverageUsage] = useState(0);
  const [period, setPeriod] = useState("day");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const pathMap = {
          day: "historicoHoje",
          week: "historicoSemana",
          month: "historicoMes",
        };

        const selectedPath = pathMap[period] || "historicoHoje";
        const userRef = ref(database, `usuarios/${user.uid}/${selectedPath}`);

        onValue(userRef, (snapshot) => {
          const historico = snapshot.val() || {};
          const formattedData = Object.entries(historico).map(([key, val]) => ({
            day: key,
            usage: val,
          }));

          setData(formattedData);

          const total = formattedData.reduce((acc, curr) => acc + curr.usage, 0);
          const average = formattedData.length ? total / formattedData.length : 0;

          setTotalUsage(total.toFixed(1));
          setAverageUsage(average.toFixed(1));
        });
      }
    });

    return () => unsubscribe();
  }, [period]); // Atualiza quando 'period' mudar

  const handleChange = (_, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  return (
    <div className="analytics-card" style={{
      background: "#12161c",
      color: "#fff",
      padding: "1.5rem",
      borderRadius: "1rem",
      width: "100%",
      maxWidth: "800px"
    }}>
      <Typography variant="h6" style={{
        color: "#18e07f",
        fontWeight: "bold",
        marginBottom: "1rem"
      }}>
        📊 Water Usage Analytics
      </Typography>

      <ToggleButtonGroup
        value={period}
        exclusive
        onChange={handleChange}
        sx={{
          background: "#181c20",
          borderRadius: "8px",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <ToggleButton value="day" sx={{
          color: "#fff",
          border: "none",
          backgroundColor: period === "day" ? "#2a2f35" : "transparent",
          borderRadius: "10px",
          px: 3
        }}>📅 Day</ToggleButton>
        <ToggleButton value="week" sx={{
          color: "#fff",
          border: "none",
          backgroundColor: period === "week" ? "#2a2f35" : "transparent",
          borderRadius: "10px",
          px: 3
        }}>🗓 Week</ToggleButton>
        <ToggleButton value="month" sx={{
          color: "#fff",
          border: "none",
          backgroundColor: period === "month" ? "#2a2f35" : "transparent",
          borderRadius: "10px",
          px: 3
        }}>📊 Month</ToggleButton>
      </ToggleButtonGroup>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1, background: "#1e2329", padding: "1rem", borderRadius: "10px" }}>
          <Typography variant="body2">Total Usage</Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#18e07f" }}>{totalUsage} L</Typography>
        </div>
        <div style={{ flex: 1, background: "#1e2329", padding: "1rem", borderRadius: "10px" }}>
          <Typography variant="body2">Average</Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#18e07f" }}>{averageUsage} L</Typography>
        </div>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "none",
                color: "#fff"
              }}
              labelStyle={{ color: "#18e07f" }}
            />
            <Bar dataKey="usage" fill="#18e07f" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
