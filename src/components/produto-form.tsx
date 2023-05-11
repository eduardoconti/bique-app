import { ListaProdutosContext } from '@/context/lista-produto-context';
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

export default function ProdutoForm() {
  const { loading, add } = React.useContext(ListaProdutosContext);
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useTheme();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await add({
      nome: data.get('nome') as string,
      descricao: data.get('descricao') as string,
      valor: parseFloat(data.get('valor') as string) * 100,
      materia_prima: [
        {
          id: '7e9bbe9c-c5da-4ccc-86fc-047bcfb26acc',
          nome: 'sonho de valsa',
          quantidade: 3,
        },
      ],
    });
    if (formRef.current) {
      formRef.current.reset();
    }
  };
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
    </Paper>
  );
}
