import * as React from 'react';
import { useState } from 'react';
import CriarAccount from "../../ui/components/paragraph/CriarAccount";
import Cabecalho from '../../ui/components/cabecalho/Cabecalho';
import Button from "../../ui/components/button/Button";
import InputsLa from "../../ui/components/inputs/Input"; // Input de login
import InputsPa from "../../ui/components/inputs/InputPas"; // Input de senha
import "../../ui/templates/login/login.css"; // Estilos
import { IoEye, IoEyeOff } from "react-icons/io5"; // Ícones
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';

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
            <Cabecalho />
            <div className='body'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    <Button >
                        Login
                    </Button>
                    <CriarAccount />
                </form>
            </div>
        </div>
    );
}
