import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Switch,
    FormControlLabel,
    Paper,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    getAuth,
    updateEmail,
    updatePassword,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    updateDoc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../../services/firebase";
import theme from "../../templates/globalThemeInputs/ThemeInputs";

export default function ProfileConfig() {
    const user = auth.currentUser;

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchUserSettings() {
            const currentUser = auth.currentUser;
            if (!currentUser) return;
            
            const userDocRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setNotifications(data.notifications || false);
                setUsername(data.nameUser || "");
                setName(data.nameComplett || "");
                setEmail(data.email || currentUser.email);
            }
        }
        fetchUserSettings();
    }, []);

    const reauthenticate = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || !currentPassword) {
            throw new Error(
                "Para atualizar o email ou senha, preencha a senha atual."
            );
        }

        const credential = EmailAuthProvider.credential(
            currentUser.email,
            currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        
        const currentUser = auth.currentUser;
            if (!currentUser) {
                setMessage("Usuário não autenticado.");
                setLoading(false);
                return;
            }
        
            try {
                if ((email && email !== currentUser.email) || password) {
                    await reauthenticate();
                }
                if (email !== currentUser.email) {
                    await updateEmail(currentUser, email);
                }
                if (name !== currentUser.displayName) {
                    await updateProfile(currentUser, { displayName: name });
                }
                if (password) {
                    await updatePassword(currentUser, password);
                }

                const userDocRef = doc(db, "users", currentUser.uid);

                await updateDoc(userDocRef, {
                    nameUser: username,
                    nameComplett: name,
                    email,
                    notifications,
                    updatedAt: serverTimestamp(),
                });

                setMessage("Perfil atualizado com sucesso!");
            } catch (error) {
                setMessage("Erro ao atualizar perfil: " + error.message);
            }
        setLoading(false);
    };

    return (
        <Paper
            sx={{
                backgroundColor: "transparent",
                p: 3,
                maxWidth: 600,
                mt: 1,
                color: "#fff",
            }}
        >
            <Typography variant="h5" gutterBottom>
                Configurações da Conta
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 1, color: "#fff" }}
            >
                <TextField
                    label="Nome Completo"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    theme={theme}
                />
                <TextField
                    label="Nome de Usuário"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    helperText="Esse nome será usado para identificar você no sistema"
                    theme={theme}
                    sx={{
                        input: { color: "#fff" }, // cor do texto digitado
                        label: { color: "#aaa" }, // cor do label
                        '& label.Mui-focused': { color: "#4F46E5" }, // cor do label quando focado
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: "#555", // borda padrão
                            },
                            '&:hover fieldset': {
                              borderColor: "#777", // borda ao passar o mouse
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#07741d", // borda ao focar
                            },
                        },
                        '& .MuiFormHelperText-root': {
                          color: "#ccc", // texto de ajuda (helperText)
                        }
                    }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    theme={theme}
                    sx={{
                        input: { color: "#fff" }, // cor do texto digitado
                        label: { color: "#aaa" }, // cor do label
                        '& label.Mui-focused': { color: "#4F46E5" }, // cor do label quando focado
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: "#555", // borda padrão
                            },
                            '&:hover fieldset': {
                              borderColor: "#777", // borda ao passar o mouse
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#07741d", // borda ao focar
                            },
                        },
                        '& .MuiFormHelperText-root': {
                          color: "#ccc", // texto de ajuda (helperText)
                        }
                    }}
                />
                <TextField
                    label="Nova Senha"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText="Deixe em branco se não quiser alterar a senha"
                    theme={theme}
                    sx={{
                        input: { color: "#fff" },
                        label: { color: "#aaa" },
                        "& label.Mui-focused": { color: "#07741d" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#555" },
                            "&:hover fieldset": { borderColor: "#777" },
                            "&.Mui-focused fieldset": { borderColor: "#07741d" },
                        },
                        "& .MuiFormHelperText-root": { color: "#ccc" },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    edge="end"
                                    sx={{ color: "#aaa" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Senha Atual"
                    variant="outlined"
                    fullWidth
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    helperText="Necessária para alterar email ou senha"
                    theme={theme}
                    sx={{
                        input: { color: "#fff" }, // cor do texto digitado
                        label: { color: "#aaa" }, // cor do label
                        '& label.Mui-focused': { color: "#4F46E5" }, // cor do label quando focado
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: "#555", // borda padrão
                            },
                            '&:hover fieldset': {
                              borderColor: "#777", // borda ao passar o mouse
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#07741d", // borda ao focar
                            },
                        },
                        '& .MuiFormHelperText-root': {
                          color: "#ccc", // texto de ajuda (helperText)
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                                    edge="end"
                                    sx={{ color: "#aaa" }}
                                >
                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Notificações"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? "Atualizando..." : "Salvar Alterações"}
                </Button>
                {message && (
                    <Typography
                        variant="body2"
                        color={message.startsWith("Erro") ? "error" : "primary"}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
}