import { MateriaPrimaContext } from '@/context/materia-prima-context';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useRef } from 'react';

export default function MateriaPrimaForm() {
  const { loading, add } = React.useContext(MateriaPrimaContext);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await add({
      nome: data.get('nome') as string,
      descricao: data.get('descricao') as string,
      valor_unitario: parseFloat(data.get('valor') as string) * 100,
    });
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  return (
    <Box
      ref={formRef}
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={1}>
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
            id="descricao"
            label="Descricao"
            name="descricao"
            autoComplete="descricao"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            required
            fullWidth
            name="valor"
            label="valor"
            type="number"
            id="valor"
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
  );
}
