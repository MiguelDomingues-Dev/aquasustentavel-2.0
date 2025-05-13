import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { auth } from "../../services/firebase";
import '../../ui/templates/cadastro/register.css';
import { getDatabase, ref, set as rtdbSet } from 'firebase/database'; // ⬅️ Adicionado

// Importação normal para o componente de Loading (sem lazy)
import Loading from "../../ui/components/Loading/index";

// Lazy load dos componentes
const Button = lazy(() => import("../../ui/components/button/Button"));
const InputsLa = lazy(() => import("../../ui/components/inputs/Input"));
const InputsPa = lazy(() => import("../../ui/components/inputs/InputPas"));
const NameUser = lazy(() => import('../../ui/components/inputs/nameUser'));
const NameComplett = lazy(() => import('../../ui/components/inputs/nameComplet'));
const Cabecalho = lazy(() => import('../../ui/components/cabecalho/Cabecalho'));
const EntrarAccount = lazy(() => import('../../ui/components/paragraph/EntrarAccount'));

// Cria a instância do Firestore
const db = getFirestore();

export default function Register() {
    const [nameUser, setNameUser] = useState("");
    const [nameComplett, setNameComplett] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    // Dados iniciais dos históricos
    const historicoHoje = {
        "Sun": 0,
        "Mon": 0,
        "Tue": 0,
        "Wed": 0,
        "Thu": 0,
        "Fri": 0,
        "Sat": 0,
    };

    const historicoSemanal = {
        "Week 1": 0,
        "Week 2": 0,
        "Week 3": 0,
        "Week 4": 0
    };

    const historicoMes = {
        "January": 0,
        "February": 0,
        "March": 0,
        "April": 0,
        "May": 0,
        "June": 0,
        "July": 0,
        "August": 0,
        "September": 0,
        "October": 0,
        "November": 0,
        "December": 0
    };

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };


    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            await updateProfile(user, {
                displayName: nameComplett
            });
        
            // 🔹 Firestore (já existente)
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email,
                nameUser,
                nameComplett,
                createdAt: serverTimestamp()
            });
        
            // 🔸 Realtime Database
            const rtdb = getDatabase();
            await rtdbSet(ref(rtdb, `usuarios/${user.uid}`), {
                uid: user.uid,
                email,
                nameUser,
                nameComplett,
                historicoHoje,
                historicoSemanal,
                historicoMes,
                criadoEm: new Date().toISOString()
            });
        
            navigate("/overview");
        } catch (err) {
            console.error("Erro ao registrar:", err);
            setError("Falha ao criar conta. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='containerRegister'>
            <Suspense fallback={<Loading />}>
                <Cabecalho />
            </Suspense>

            <div className="body">
                <h2>Criar Conta</h2>
                <form onSubmit={handleRegister}>
                    <Suspense fallback={<Loading />}>
                        <div className='inputSingle'>
                            <NameUser
                                id="nameUser"
                                value={nameUser}
                                onChange={(e) => setNameUser(e.target.value)}
                            />
                            <label htmlFor="nameUser">Nome de Usuário</label>
                        </div>
                        <div className='inputSingle'>
                            <NameComplett
                                id="nameComplett"
                                value={nameComplett}
                                onChange={(e) => setNameComplett(e.target.value)}
                            />
                            <label htmlFor="nameComplett">Nome Completo</label>
                        </div>
                        <div className='inputSingle'>
                            <InputsLa
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className='inputSingle'>
                            <InputsPa
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Senha</label>
                            <div
                                className='iconEye'
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer' }}
                            >
                                {passwordVisible ? <IoEyeOff /> : <IoEye />}
                            </div>
                        </div>
                    </Suspense>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <Suspense fallback={<Loading />}>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Registrando..." : "Registrar"}
                        </Button>
                    </Suspense>

                    <Suspense fallback={<Loading />}>
                        <EntrarAccount />
                    </Suspense>
                </form>
            </div>
        </div>
    );
}
