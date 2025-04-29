import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { auth } from '../../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Link de redefinição de senha enviado para o seu e-mail.');
    } catch (error) {
      setMessage('Erro ao enviar link: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <Paper
      sx={{
        backgroundColor: 'transparent',
        p: 3,
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        color: '#fff',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Esqueci Minha Senha
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Digite seu e-mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            input: { color: '#fff' },
            label: { color: '#aaa' },
            '& label.Mui-focused': { color: '#4F46E5' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#777' },
              '&.Mui-focused fieldset': { borderColor: '#07741d' },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !email}
        >
          {loading ? 'Enviando...' : 'Enviar Link'}
        </Button>
        {message && (
          <Typography
            variant="body2"
            color={message.startsWith('Erro') ? 'error' : 'primary'}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}