import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Slider,
  Switch,
  Stack,
  Divider,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Droplets, Bell, Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import {
  updateEmail,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

/* ------------ valores iniciais ------------ */
const defaultValues = {
  name: "",
  username: "",
  email: "",
  newPassword: "",
  currentPassword: "",
  notifications: true,
  waterGoal: 150,      // L/dia
  alertThreshold: 4,   // L/min
};

export default function ProfileSettings() {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  /* toggles de visibilidade das senhas */
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCurrPass, setShowCurrPass] = useState(false);

  /* ---------- carregar Firestore ---------- */
  useEffect(() => {
    async function fetchData() {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      const d = snap.exists() ? snap.data() : {};

      reset({
        name: d.nameComplett || user.displayName || "",
        username: d.nameUser || "",
        email: d.email || user.email || "",
        newPassword: "",
        currentPassword: "",
        notifications: d.notifications ?? true,
        waterGoal: d.waterGoal ?? 150,
        alertThreshold: d.alertThreshold ?? 4,
      });
    }
    fetchData();
  }, [reset]);

  /* ---------- helpers ---------- */
  const reauth = async (currPassword) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado.");
    if (!currPassword)
      throw new Error("Informe a senha atual para alterar e‑mail ou senha.");

    const cred = EmailAuthProvider.credential(user.email, currPassword);
    await reauthenticateWithCredential(user, cred);
  };

  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (!user) {
      setError("root", { message: "Usuário não autenticado." });
      return;
    }

    try {
      /* reautenticação se necessário */
      if (
        (data.email && data.email !== user.email) ||
        data.newPassword
      ) {
        await reauth(data.currentPassword);
      }

      /* Firebase Auth */
      if (data.email !== user.email) await updateEmail(user, data.email);
      if (data.name !== user.displayName)
        await updateProfile(user, { displayName: data.name });
      if (data.newPassword) await updatePassword(user, data.newPassword);

      /* Firestore */
      await updateDoc(doc(db, "users", user.uid), {
        nameUser: data.username,
        nameComplett: data.name,
        email: data.email,
        notifications: data.notifications,
        waterGoal: data.waterGoal,
        alertThreshold: data.alertThreshold,
        updatedAt: serverTimestamp(),
      });

      reset({ ...data, newPassword: "", currentPassword: "" });
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error(err);
      setError("root", { message: err.message });
    }
  };

  /* ---------- estilos compartilhados ---------- */
  const green = "#1DB954";
  const textFieldSX = {
    input: { color: "#fff" },
    label: { color: "#aaa" },
    "& label.Mui-focused": { color: green },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#555" },
      "&:hover fieldset": { borderColor: "#777" },
      "&.Mui-focused fieldset": { borderColor: green },
    },
    "& .MuiFormHelperText-root": { color: "#ccc" },
  };
  const sliderSX = {
    "& .MuiSlider-thumb, & .MuiSlider-track": { color: green },
    "& .MuiSlider-rail": { color: "#555" },
  };

  /* ---------- UI ---------- */
  return (
    <Paper
      sx={{
        bgcolor: "#181C20",
        border: "1px solid #2f3336",
        borderRadius: 2,
        p: 3,
        color: "#d1d5db",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Configurações da Conta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* --------- Dados pessoais --------- */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Nome é obrigatório" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome Completo"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={textFieldSX}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          rules={{ required: "Usuário é obrigatório" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome de Usuário"
              fullWidth
              error={!!errors.username}
              helperText={
                errors.username?.message ||
                "Usado para identificá‑lo no sistema"
              }
              sx={textFieldSX}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "E‑mail é obrigatório",
            pattern: { value: /^\S+@\S+$/i, message: "E‑mail inválido" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={textFieldSX}
            />
          )}
        />

        <Divider sx={{ borderColor: "#2f3336", my: 2 }} />

        {/* --------- Senhas --------- */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={showNewPass ? "text" : "password"}
              label="Nova Senha"
              fullWidth
              helperText="Deixe em branco se não quiser alterar"
              sx={textFieldSX}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPass((p) => !p)}
                      edge="end"
                      sx={{ color: "#aaa" }}
                    >
                      {showNewPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={showCurrPass ? "text" : "password"}
              label="Senha Atual"
              fullWidth
              helperText="Necessária para alterar e‑mail ou senha"
              sx={textFieldSX}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrPass((p) => !p)}
                      edge="end"
                      sx={{ color: "#aaa" }}
                    >
                      {showCurrPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Divider sx={{ borderColor: "#2f3336", my: 2 }} />

        {/* --------- Água --------- */}
        <Typography variant="h6" gutterBottom>
          Configurações de Água
        </Typography>

        {/* Meta diária */}
        <Controller
          name="waterGoal"
          control={control}
          render={({ field }) => (
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Droplets size={18} />
                  <Typography>Meta Diária</Typography>
                </Stack>
                <Typography sx={{ color: green }}>{field.value} L</Typography>
              </Stack>
              <Slider
                {...field}
                value={field.value}
                onChange={(_, v) => field.onChange(v)}
                step={10}
                min={50}
                max={300}
                sx={sliderSX}
              />
            </Box>
          )}
        />

        {/* Limite de alerta */}
        <Controller
          name="alertThreshold"
          control={control}
          render={({ field }) => (
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Bell size={18} />
                  <Typography>Limite de Alerta</Typography>
                </Stack>
                <Typography sx={{ color: green }}>
                  {field.value} L/min
                </Typography>
              </Stack>
              <Slider
                {...field}
                value={field.value}
                onChange={(_, v) => field.onChange(v)}
                step={1}
                min={1}
                max={10}
                sx={sliderSX}
              />
            </Box>
          )}
        />

        {/* Notificações */}
        <Controller
          name="notifications"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Bell size={18} />
                <Typography>Notificações</Typography>
              </Stack>
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                color="success"
              />
            </Stack>
          )}
        />

        {/* --------- Submit --------- */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          startIcon={isSubmitting && <CircularProgress size={18} />}
          sx={{ bgcolor: green, "&:hover": { bgcolor: "#169946" }, py: 1.5 }}
        >
          <Save size={18} />
          {isSubmitting ? "Atualizando..." : "Salvar Tudo"}
        </Button>

        {errors.root && (
          <Typography variant="body2" color="error">
            {errors.root.message}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
