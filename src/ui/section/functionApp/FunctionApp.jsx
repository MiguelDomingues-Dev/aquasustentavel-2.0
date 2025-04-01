import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Link } from '@mui/material';
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
    color: "#fff",
    backgroundColor: "#00B21B",
    boxShadow: "0px 6px 20px rgba(47, 255, 0, 0.2509803922)",
    border: "none"
});

const CustomButtonLogin = styled(Button)({
    backgroundColor: "#003127",
    border: "2px solid rgba(0, 178, 27, 0.6901960784)"
});

export default function FunctionApp() {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate("/login");
    };

    const handleClickRegister = () => {
        navigate("/register");
    };

    return (
        <Box className="container" sx={{ p: 2 }}
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
        >
            {/* Seção do slogan e título */}
            <Box
                id="slogan-titleMain"
                display="flex"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <img
                    src="/public/sloganImg.png"
                    alt="Imagem do slogan do projeto"
                    style={{ marginRight: '1rem' }}
                />
                <Box id="titles"
                    display="flex"
                    flexDirection="column"
                >
                    <Typography variant="h3" component="h1" fontSize="14px" alignSelf="center">
                        AquaSustentável
                    </Typography>
                    <Typography variant="h5" component="h2" fontSize="6px">
                        T E C N O L O G I A & S U S T E N T A B I L I D A D E
                    </Typography>
                </Box>
            </Box>
        
            {/* Navegação */}
            <Box component="nav" sx={{ mb: 2 }}>
                <Link href="#comoFunciona" underline="none" sx={{ mr: 2 }}>
                    Como funciona
                </Link>
                <Link href="#plansServices" underline="none" sx={{ mr: 2 }}>
                    Preços
                </Link>
                <Link href="#sobre" underline="none" sx={{ mr: 2 }}>
                    Sobre nós
                </Link>
                <Link href="#contanto" underline="none">
                    Contato
                </Link>
            </Box>
        
            {/* Botões */}
            <Box id="btns" display="flex">
                <CustomButtonLogin
                    id="btnLogin"
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={handleClickLogin}
                >
                    Login
                </CustomButtonLogin>
                <CustomButton variant="outlined" color="primary" onClick={handleClickRegister}>
                    Sign up
                </CustomButton>
            </Box>
        </Box>
    );
};