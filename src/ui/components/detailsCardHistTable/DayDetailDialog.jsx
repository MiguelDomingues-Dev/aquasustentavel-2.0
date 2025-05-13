import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, off } from "firebase/database";

export default function DayDetailDialog({ open, onClose, date }) {
  const [rows, setRows] = useState(null);   // null = loading

  useEffect(() => {
    if (!open || !date) return;

    const { currentUser } = getAuth();
    if (!currentUser) return;

    const db = getDatabase();
    const detRef = ref(
      db,
      `usuarios/${currentUser.uid}/historicoDetalhado/${date}`
    );

    const unsub = onValue(detRef, (snap) => {
      const obj = snap.val() || {};
      // obj = { "08:15":1.25, "09:20":0.8, ... }
      const array = Object.entries(obj).map(([hora, litros]) => ({
        hour: hora,
        liters: litros,
      }));
      setRows(array);
    });

    return () => off(detRef);  // cleanup
  }, [open, date]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalhes de {date}</DialogTitle>
      <DialogContent dividers>
        {rows === null ? (
          <CircularProgress />
        ) : rows.length === 0 ? (
          <Typography>Nenhum dado detalhado para este dia.</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Hora</TableCell>
                <TableCell align="right">Litros</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.hour}>
                  <TableCell>{r.hour}</TableCell>
                  <TableCell align="right">{r.liters.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}
