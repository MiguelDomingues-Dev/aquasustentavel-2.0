import React, { useState, lazy, Suspense } from 'react';
import "../../ui/templates/login/login.css"; // Estilos
import { IoEye, IoEyeOff } from "react-icons/io5"; // Ícones
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';
import Loading from '../../ui/components/Loading';

const Button = lazy(() => import("../../ui/components/button/Button"));
const InputsLa = lazy(() => import("../../ui/components/inputs/Input"));
const InputsPa = lazy(() => import("../../ui/components/inputs/InputPas"));
const Cabecalho = lazy(() => import('../../ui/components/cabecalho/Cabecalho'));
const CriarAccount = lazy(() => import('../../ui/components/paragraph/CriarAccount'));
const ResetPassword = lazy(() => import('../../ui/components/paragraph/ResetPassword'));

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("Email digitado:", email); // Verifica o valor do email
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuário logado:", userCredential.user);
            navigate("/overview")
            // Redirecione ou atualize o estado global aqui
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setError("Falha no login. Verifique suas credenciais e tente novamente.");
        }
    };

    return (
        <div className='containerLogin'>
            <Suspense fallback={<Loading />}>
                <Cabecalho />
            </Suspense>
            <div className='body'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <Suspense fallback={<Loading />}>
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
                        <Button>
                            Login
                        </Button>
                    </Suspense>
                    <Suspense fallback={<Loading />}>
                        <CriarAccount />
                        <ResetPassword />
                    </Suspense>
                </form>
            </div>
        </div>
    );
}
