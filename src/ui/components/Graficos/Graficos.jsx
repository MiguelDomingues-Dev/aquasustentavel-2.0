import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./graficos.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { database } from "../../../services/firebase";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function DashboardWidget() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [fluxo, setFluxo] = useState(0);
  const [consumoTotal, setConsumoTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

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
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="contaneirGraficos">
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Gráfico do Dia</h2>
        <p className="text-sm mb-2">Fluxo atual: {fluxo} L/min</p>
        <p className="text-sm mb-4">Consumo total: {consumoTotal} L</p>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="valor" stroke="#4F46E5" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="hora" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Calendário</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="rounded-xl p-2 text-black"
        />
        <p className="mt-4 text-sm text-gray-300">
          Data selecionada:{" "}
          <span className="font-semibold text-white">
            {selectedDate.toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}
