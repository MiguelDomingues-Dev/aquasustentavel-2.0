import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Link } from '@mui/material';
import { styled } from "@mui/system";

import "./functionApp.css";

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

const CustomLink = styled(Link) ({
    color: "#fff",
    fontWeight: 400,
    fontSize: "1.125rem",
    position: "relative",
    "&::after": {
        content: '""',
        width: "0%",
        height: "2px",
        backgroundColor: "#00B21B",
        position: "absolute",
        bottom: "-3px",
        left: "0",
        transition: "width 0.5s ease-in-out",
    },

    "&:hover": {
        color: "#00B21B", // Muda a cor do texto ao passar o mouse
        "&::after": {
            width: "100%", // Faz a linha crescer ao passar o mouse
        },
    },
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
        <Box className="containerFunction"
            sx={{ position: "fixed", mt: '-85px', bgcolor: "#03131B", zIndex: 1}}
        >
            {/* Seção do slogan e título */}
            <Box
                id="slogan-titleMain"
                display="flex"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <img
                    src="/sloganImg.png"
                    alt="Imagem do slogan do projeto"
                    style={{ marginRight: '1rem' }}
                />
                <Box id="titles"
                    display="flex"
                    flexDirection="column"
                >
                    <Typography variant="h3" component="h1" fontSize="14px" alignSelf="center" color='#fff'>
                        AquaSustentável
                    </Typography>
                    <Typography variant="h5" component="h2" fontSize="6px" color='#fff'>
                        T E C N O L O G I A & S U S T E N T A B I L I D A D E
                    </Typography>
                </Box>
            </Box>
        
            {/* Navegação */}
            <Box component="nav" sx={{ mb: 2 }}>
                <CustomLink href="#comoFunciona" underline="none" sx={{ mr: 2 }}>
                    Como funciona
                </CustomLink>
                <CustomLink href="#plansServices" underline="none" sx={{ mr: 2 }}>
                    Preços
                </CustomLink>
                <CustomLink href="#sobre" underline="none" sx={{ mr: 2 }}>
                    Sobre nós
                </CustomLink>
                <CustomLink href="#contanto" underline="none">
                    Contato
                </CustomLink>
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