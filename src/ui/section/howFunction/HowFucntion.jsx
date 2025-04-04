import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
// Ícones do Material UI (escolhi alguns que lembram o design da imagem)
import SensorsIcon from "@mui/icons-material/Sensors";
import TuneIcon from "@mui/icons-material/Tune";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export default function FeaturesSection() {
    return (
        <Box >
            <Container>
                <Grid container spacing={4} justifyContent="center">
                  {/* Integração a Sensores */}
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <SensorsIcon sx={{ fontSize: 60, color: "#00B21B", mb: 2 }} />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Integração a sensores
                            </Typography>
                            <Typography variant="body1">
                                Com integração e configuração com a maior facilidade do mercado.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Dashboards Interativos */}
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <TuneIcon sx={{ fontSize: 60, color: "#00B21B", mb: 2 }} />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Dashboards interativos
                            </Typography>
                            <Typography variant="body1">
                                Compreenda e analise seus custos com dashboards autônomos que
                                indicam a maior economia possível.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Automação */}
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <MarkEmailReadIcon sx={{ fontSize: 60, color: "#00B21B", mb: 2 }} />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Automação
                            </Typography>
                            <Typography variant="body1">
                                E-mails acionados automaticamente para obter feedback da sua
                                plataforma com organização e suporte funcional.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
