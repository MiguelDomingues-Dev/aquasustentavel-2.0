// DashboardSensor.jsx
import React, { useEffect, useState } from "react";
import "./dashboardSensor.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, off } from "firebase/database";

export default function DashboardSensor() {
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);      // evita flicker do switch

  /* ---------- Listener RTDB ---------- */
  useEffect(() => {
    const auth = getAuth();

    // espera login
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) { setReady(false); return; }

      const db = getDatabase();
      const cmdRef = ref(
        db,
        `usuarios/${user.uid}/dados/ligarDesligar`
      );

      // escuta mudanças vindas do ESP32 ou de outro device
      const unsubRTDB = onValue(cmdRef, (snap) => {
        setChecked(snap.val() === true);    // default false se nó inexistente
        setReady(true);
      });

      // cleanup quando usuário troca ou componente desmonta
      return () => off(cmdRef);
    });

    return () => unsubAuth();
  }, []);

  /* ---------- Toggle ---------- */
  const handleToggle = async (e) => {
    const newVal = e.target.checked;
    setChecked(newVal);                      // feedback instantâneo

    const user = getAuth().currentUser;
    if (!user) return;                       // não deveria acontecer

    await set(
      ref(getDatabase(), `usuarios/${user.uid}/dados/ligarDesligar`),
      newVal
    );
  };

  /* ---------- Render ---------- */
  return (
    <div className="dashboard-sensor">
      <div className="sensor-card">
        <div className="sensor-header">
          <span>Sensor Status</span>

          <label className="switch">
            <input
              type="checkbox"
              disabled={!ready}
              checked={checked}
              onChange={handleToggle}
            />
            <span className="slider" />
          </label>
        </div>

        <div className="sensor-status">
          {checked ? "Ativo" : "Inativo"}
        </div>
      </div>
    </div>
  );
}
