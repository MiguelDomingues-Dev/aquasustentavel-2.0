// SensorStatusToggle.jsx
import { useEffect, useState } from "react";
import { Switch, Typography, Card, CardContent } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

// 1. Config Firebase Web (mesmo projeto do ESP32)
const firebaseConfig = {
  apiKey: "AIzaSyCoSCh-xyM3QGRqnGs5LoMrsPcLd9lTRxU",
  authDomain: "aquasutentavel.firebaseapp.com",
  databaseURL: "https://aquasutentavel-default-rtdb.firebaseio.com",
  projectId: "aquasutentavel",
};
const app  = initializeApp(firebaseConfig);
const db   = getDatabase(app);
const auth = getAuth(app);

export default function SensorStatusToggle() {
  const [checked, setChecked] = useState(false);
  const [ready,   setReady]   = useState(false); // evita flicker

  useEffect(() => {
    // 2. Espera até saber quem é o usuário
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) return;                         // não logado
      const cmdRef = ref(db, `/usuarios/${user.uid}/dados/ligarDesligar`);

      // 3. Assina atualizações vindas do ESP32 (feedback em tempo‑real)
      onValue(cmdRef, (snap) => {
        setChecked(snap.val() === true);
        setReady(true);
      });
    });

    return () => unsub();
  }, []);

  const handleToggle = async (event) => {
    const newVal = event.target.checked;
    setChecked(newVal);                          // UI imediata

    // 4. Grava no Firebase (ESP32 lerá em até ~100 ms)
    await set(
      ref(db, `/usuarios/${auth.currentUser.uid}/dados/ligarDesligar`),
      newVal
    );
  };

  return (
    <Card sx={{ p: 2, bgcolor: "#1f242b", color: "white" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0,
        }}
      >
        <div>
          <Typography variant="subtitle2">Sensor Status</Typography>
          <Typography
            variant="h6"
            color={checked ? "#3ED598" : "#FF7777"}
            sx={{ mt: 1 }}
          >
            {checked ? "Active" : "Inactive"}
          </Typography>
        </div>

        {ready && (
          <Switch
            checked={checked}
            onChange={handleToggle}
            inputProps={{ "aria-label": "ligar-desar-ligar-solenóide" }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#fff",
                "& + .MuiSwitch-track": { bgcolor: "#3ED598" },
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
