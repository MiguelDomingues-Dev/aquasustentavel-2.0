import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { database } from "../../../services/firebase";
import { ref, onValue } from "firebase/database";

export default function DashboardWidget() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [fluxo, setFluxo] = useState(0);
    const [consumoTotal, setConsumoTotal] = useState(0);

  useEffect(() => {
    const dashboardRef = ref(database, "usuarios");

    onValue(dashboardRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setFluxo(val.fluxoDeAgua || 0);
        setConsumoTotal(val.consumoTotal || 0);
        setData(val.historicoHoje || []);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-4 bg-gray-900 rounded-2xl shadow-md text-white">
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
