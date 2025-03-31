import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { auth } from "../../services/firebase";

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
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            // Cria o usuário com Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Usuário registrado:", user);

            // Armazena os dados adicionais do usuário no Cloud Firestore
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                email: email,
                nameUser: nameUser,
                nameComplett: nameComplett,
                createdAt: new Date()
            });

            // Redireciona para o dashboard após o registro
            navigate("/overview");
        } catch (err) {
            console.error("Erro ao criar conta:", err);
            setError("Falha ao criar conta. Verifique os dados e tente novamente.");
        }
    };

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className='containerRegister'>
                <Cabecalho />
                <div className="body">
                    <h2>Criar Conta</h2>
                    <form onSubmit={handleRegister}>
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
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Button type="submit">Registrar</Button>
                    </form>
                    <EntrarAccount />
                </div>
            </div>
        </Suspense>
    );
}
