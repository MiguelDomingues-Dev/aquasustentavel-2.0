import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    useMediaQuery,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

export default function Contato() {
    const isMobile = useMediaQuery("(max-width:900px)");

    return (
        <Box
            sx={{
                color: "#fff",
                px: { xs: 2, md: 8 },
                py: { xs: 6, md: 10 },
            }}
        >
            <Grid container spacing={6} alignItems="center">
              {/* Texto e Ícone */}
                <Grid item xs={12} md={4} textAlign="center">
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 3 }}
                    >
                        Querendo formar parceria, precisando <br />
                        de ajuda suporte, envie um email!
                    </Typography>
                    <ChatOutlinedIcon
                        sx={{
                            fontSize: 150,
                            color: "#00B21B",
                            mt: 2,
                        }}
                    />
                </Grid>
                {/* Formulário */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="standard"
                                InputLabelProps={{ style: { color: "#fff" } }}
                                InputProps={{
                                    disableUnderline: false,
                                    sx: { color: "#fff", borderBottom: "1px solid #00B21B" },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Sobrenome"
                                variant="standard"
                                InputLabelProps={{ style: { color: "#fff" } }}
                                InputProps={{
                                    disableUnderline: false,
                                    sx: { color: "#fff", borderBottom: "1px solid #00B21B" },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="standard"
                                InputLabelProps={{ style: { color: "#fff" } }}
                                InputProps={{
                                    disableUnderline: false,
                                    sx: { color: "#fff", borderBottom: "1px solid #00B21B" },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Telefone"
                                variant="standard"
                                InputLabelProps={{ style: { color: "#fff" } }}
                                InputProps={{
                                    disableUnderline: false,
                                    sx: { color: "#fff", borderBottom: "1px solid #00B21B" },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mensagem"
                                variant="standard"
                                multiline
                                rows={4}
                                placeholder="Escreva sua mensagem"
                                InputLabelProps={{ style: { color: "#fff" } }}
                                InputProps={{
                                    disableUnderline: false,
                                    sx: { color: "#fff", borderBottom: "1px solid #00B21B" },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center" mt={3}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#00B21B",
                                    px: 5,
                                    py: 1,
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    "&:hover": {
                                        backgroundColor: "#009e1a",
                                    },
                                    maxWidth: isMobile ? "100%" : "auto",
                                }}
                            >
                                Enviar Email
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
