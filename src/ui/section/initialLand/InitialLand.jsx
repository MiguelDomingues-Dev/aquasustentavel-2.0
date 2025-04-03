import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';
import { styled } from "@mui/system";
import "./initialLand.css";

const CustomButton = styled(Button)({
    color: "#fff",
    backgroundColor: "#00B21B",
    boxShadow: "0px 6px 20px rgba(47, 255, 0, 0.25)",
    border: "none",
    "&:hover": {
        backgroundColor: "#008C15"
    }
});

const CustomButtonLogin = styled(Button)({
    backgroundColor: "#003127",
    border: "2px solid rgba(0, 178, 27, 0.69)",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#005643"
    }
});

export default function InitialLand() {
    const navigate = useNavigate();

    // 🔹 Funções de navegação corrigidas
    const handleClickLogin = () => {
        navigate("/login");
    };

    const handleClickRegister = () => {
        navigate("/register");
    };

    return (
        <div className="containerInitial">
            <h3>Pare de gastar água à toa</h3>
            <h2>Economize de melhor forma</h2>
            <p>Aumente a eficiência, economize dinheiro com nossos dashboards.</p>

            <Box id="btns" display="flex">
                <CustomButtonLogin
                    id="btnLogin"
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={handleClickLogin}
                >
                    Login
                </CustomButtonLogin>
                
                <CustomButton variant="outlined" onClick={handleClickRegister}>
                    Sign up
                </CustomButton>
            </Box>
        </div>
    );
}
