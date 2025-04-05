import React from "react";
import { Box, Typography } from "@mui/material";
// Ícones do Material UI
import SensorsIcon from "@mui/icons-material/Sensors";
import TuneIcon from "@mui/icons-material/Tune";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

import "./howFucntion.css";

export default function FeaturesSection() {
    return (
        <div 
            className="containerHow" 
            style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}
        >
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-around",
                    alignItems: "center",
                    px: 2,
                }}
            >
              {/* Integração a Sensores */}
                <Box sx={{ flex: 1, maxWidth: "300px", textAlign: "center" }}>
                    <SensorsIcon sx={{ fontSize: 60, color: "#00B21B"}} />
                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                        Integração a sensores
                    </Typography>
                    <Typography variant="body1" color="white">
                        Com integração e configuração com a maior facilidade do mercado.
                    </Typography>
                </Box>
            
              {/* Dashboards Interativos */}
                <Box sx={{ flex: 1, maxWidth: "300px", textAlign: "center" }}>
                    <TuneIcon sx={{ fontSize: 60, color: "#00B21B", mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                        Dashboards interativos
                    </Typography>
                    <Typography variant="body1" color="white">
                        Compreenda e analise seus custos com dashboards autônomos que indicam a maior economia possível.
                    </Typography>
                </Box>
            
              {/* Automação */}
                <Box sx={{ flex: 1, maxWidth: "300px", textAlign: "center" }}>
                    <MarkEmailReadIcon sx={{ fontSize: 60, color: "#00B21B", mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                        Automação
                    </Typography>
                    <Typography variant="body1" color="white">
                        E-mails acionados automaticamente para obter feedback da sua plataforma com organização e suporte funcional.
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
