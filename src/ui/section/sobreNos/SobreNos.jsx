import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

export default function SobreNos() {
    return (
        <Box
            sx={{
                color: "#fff",
                px: { xs: 2, md: 16 },
                py: { xs: 6, md: 10 }
            }}
        >
            <Grid container spacing={4} alignItems="center">
              {/* Texto */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Sobre nós
                    </Typography>
                    <Divider
                        sx={{
                            width: 60,
                            height: 4,
                            bgcolor: "#00B21B",
                            mb: 4,
                            borderRadius: 2,
                        }}
                    />
                    <Typography variant="body1" textAlign="justify" sx={{ lineHeight: 1.8 }}>
                        Somos uma pequena startup dedicada a promover a sustentabilidade por meio de soluções inovadoras no monitoramento e gerenciamento de consumo de água. Nosso produto foi desenvolvido com o propósito de ajudar o meio ambiente e colaborar com a implementação dos Objetivos de Desenvolvimento Sustentável (ODS), especialmente o ODS-12, que busca garantir padrões de produção e consumo sustentáveis.
                        <br /><br />
                        Com uma equipe de 4 pessoas altamente comprometidas e apaixonadas pelo que fazemos, trabalhamos incansavelmente para oferecer uma solução que permita aos usuários monitorar o consumo de água de forma eficaz, contribuindo para a preservação dos recursos naturais e ajudando tanto as pessoas quanto as empresas a economizar água e reduzir custos. Acreditamos que pequenas ações podem gerar grandes mudanças, e nosso objetivo é transformar o cotidiano das pessoas, promovendo hábitos mais sustentáveis, eficientes e conscientes.
                        <br /><br />
                        Juntos, estamos construindo um futuro mais verde e sustentável, onde cada gota conta.
                    </Typography>
                </Grid>
                {/* Ícone */}
                <Grid item xs={12} md={4} textAlign="center">
                    <GroupsIcon sx={{ fontSize: 180, color: "#9CA3AF" }} />
                </Grid>
            </Grid>
        </Box>
    );
}