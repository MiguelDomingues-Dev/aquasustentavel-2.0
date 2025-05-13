import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, off } from "firebase/database";
import CardHist from "../cardHist/CardHist";
import DayDetailDialog from "../../detailsCardHistTable/DayDetailDialog";   // novo

const weekOrder = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function BodyHist() {
  const [records, setRecords]   = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) { setRecords([]); return; }

      const db = getDatabase();
      const histRef = ref(db, `usuarios/${user.uid}/historicoHoje`);

      const unsubRTDB = onValue(histRef, (snap) => {
        const obj = snap.val() || {};
        const arr = Object.entries(obj).map(([day,value])=>({
          id:day,date:day,consumption:value.toFixed(2)
        }));
        arr.sort((a,b)=>weekOrder.indexOf(a.date)-weekOrder.indexOf(b.date));
        setRecords(arr);
      });

      return () => off(histRef);
    });

    return () => unsubAuth();
  }, []);

  return (
    <>
      <Box
        sx={{
          display:"flex", flexWrap:"wrap", justifyContent:"center",
          gap:2, p:2, width:"100%", boxSizing:"border-box"
        }}
      >
        {records.length ? (
          records.map((rec) => (
            <CardHist
              key={rec.id}
              date={rec.date}
              consumption={rec.consumption}
              onShowDetails={() => setSelectedDay(rec.date)}
            />
          ))
        ) : (
          <Typography>Nenhum registro encontrado.</Typography>
        )}
      </Box>

      {/* modal */}
      <DayDetailDialog
        open={Boolean(selectedDay)}
        date={selectedDay}
        onClose={() => setSelectedDay(null)}
      />
    </>
  );
}
