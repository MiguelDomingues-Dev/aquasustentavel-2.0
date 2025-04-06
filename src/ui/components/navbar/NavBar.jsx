import React, { useState, useEffect } from 'react';
import './navbar.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from "../../../services/firebase"; // Certifique-se que db está importado corretamente
import AccountMenu from "../MenuSuspenso/MenuSuspenso";

export default function NavBar({ namePage }) { // desestruturando a prop namePage
    const [userName, setUserName] = useState("Carregando...");

    useEffect(() => {
        const fetchUserData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userUID = user.uid; // Obtém o UID do usuário logado
                    
                    try {
                        // Consulta ao Firestore buscando o usuário pelo UID
                        const q = query(collection(db, "users"), where("uid", "==", userUID));
                        const querySnapshot = await getDocs(q);
                        
                        if (!querySnapshot.empty) {
                            const userData = querySnapshot.docs[0].data();
                            setUserName(userData.nameUser); // Define o nome do usuário
                        } else {
                            setUserName("Usuário não encontrado");
                        }
                    } catch (error) {
                        console.error("Erro ao buscar usuário:", error);
                        setUserName("Erro ao carregar");
                    }
                } else {
                    setUserName("Nenhum usuário logado");
                }
            });
        };
        fetchUserData();
    }, []);

    return (
        <div className='nabBarContainer'>
            <h2>{namePage || "Overview"}</h2>
            <div className='containerUser'>
                <p>@{userName ? userName : "Carregando..."}</p>
                <AccountMenu />
            </div>
        </div>
    );
}
