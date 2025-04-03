import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import CardHist from "../cardHist/CardHist"; // ajuste o caminho conforme necessário

export default function BodyHist() {
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return; // Se o usuário não estiver logado, não faz nada
      
      const db = getFirestore();
      const registroRef = collection(db, "registroDiario");
      const q = query(registroRef, where("userId", "==", user.uid));
      
      try {
        const snapshot = await getDocs(q);
        const dataArr = [];
        snapshot.forEach((doc) => {
          dataArr.push({ id: doc.id, ...doc.data() });
        });
        
        // Ordena os registros pela data (do mais recente para o mais antigo)
        dataArr.sort((a, b) => (a.data < b.data ? 1 : -1));
        setRecords(dataArr);
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="bodyHistContainer">
      {records.length > 0 ? (
        records.map((record) => (
          <CardHist
            key={record.id}
            date={record.data}             // Ex.: "2025-03-30"
            consumption={record.consumoTotal} // Ex.: 1500
          />
        ))
      ) : (
        <p>Nenhum registro encontrado.</p>
      )}
    </div>
  );
}
