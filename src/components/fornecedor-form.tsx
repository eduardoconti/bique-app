import { FornecedorContext } from '@/context/fornecedores-context';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useRef } from 'react';

export default function FornecedorForm() {
  const { loading, add } = React.useContext(FornecedorContext);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const site = data.get('site')?.toString();
    const email = data.get('email')?.toString();
    await add({
      nome: data.get('nome') as string,
      email: email?.length ? email : undefined,
      site: site?.length ? site : undefined,
      telefone: data.get('telefone') as string,
    });
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const theme = useTheme();

  return (
    <Paper elevation={1} sx={{ padding: theme.spacing(2) }}>
      <Box
        ref={formRef}
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              autoComplete="given-name"
              name="nome"
              required
              fullWidth
              id="nome"
              label="Nome"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              required
              fullWidth
              name="telefone"
              label="telefone"
              id="telefone"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              id="site"
              label="Site"
              name="site"
              autoComplete="site"
            />
          </Grid>
        </Grid>
        {loading ? (
          <CircularProgress sx={{ mt: 3, mb: 2 }} />
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
        )}
      </Box>
    </Paper>
  );
}
