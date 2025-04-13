import React from "react";
import { Box, Grid, Typography, Link, IconButton, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Rodape() {
    return (
        <Box
            sx={{
                bgcolor: "#013229",
                color: "#fff",
                px: { xs: 4, md: 10 },
                py: { xs: 6, md: 8 },
            }}
        >
            <Grid container spacing={6}>
                {/* Redes sociais */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Segue nós nas <br /> redes sociais
                    </Typography>
                    <Stack direction="row" spacing={2} mt={2}>
                        <IconButton
                            sx={{
                                width: 26.79,
                                height: 26.79,
                                bgcolor: "#fff",
                                "&:hover": { bgcolor: "#e0e0e0" },
                            }}
                        >
                            <TwitterIcon sx={{ color: "#000" }} />
                        </IconButton>
                        <IconButton
                            sx={{
                                width: 26.79,
                                height: 26.79,
                                bgcolor: "#fff",
                                "&:hover": { bgcolor: "#e0e0e0" },
                            }}
                        >
                            <LinkedInIcon sx={{ color: "#000" }} />
                        </IconButton>
                    </Stack>
                </Grid>

                {/* Colunas de links */}
                <Grid item xs={6} md={2}>
                    <Typography fontWeight="bold" mb={1}>
                        Home
                    </Typography>
                    <Stack spacing={1}>
                        <Link href="#" underline="none" color="inherit">
                            O que é
                        </Link>
                        <Link href="#" underline="none" color="inherit">
                            Como funciona
                        </Link>
                        <Link href="#" underline="none" color="inherit">
                            Por que é importante
                        </Link>
                        <Link href="#" underline="none" color="inherit">
                            Preços
                        </Link>
                    </Stack>
                </Grid>

                <Grid item xs={6} md={2}>
                    <Typography fontWeight="bold" mb={1}>
                        Empresa
                    </Typography>
                    <Stack spacing={1}>
                        <Link href="#" underline="none" color="inherit">
                            Sobre
                        </Link>
                        <Link href="#" underline="none" color="inherit">
                            Blog
                        </Link>
                    </Stack>
                </Grid>

                <Grid item xs={6} md={2}>
                    <Typography fontWeight="bold" mb={1}>
                        Legal
                    </Typography>
                    <Stack spacing={1}>
                        <Link href="#" underline="none" color="inherit">
                            Termos e Condições
                        </Link>
                        <Link href="#" underline="none" color="inherit">
                            Política de Privacidade
                        </Link>
                        <Link href="#" underline="none" color="inherit">
                            Contato
                        </Link>
                    </Stack>
                </Grid>

                <Grid item xs={6} md={2}>
                    <Typography fontWeight="bold" mb={1}>
                        Help
                    </Typography>
                    <Stack spacing={1}>
                        <Link href="#" underline="none" color="inherit">
                            FAQs
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}