import { ListaProdutosContext } from '@/context/lista-produto-context';
import { MateriaPrimaContext } from '@/context/materia-prima-context';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Item = {
  nome: string;
  quantidade: number;
};
export default function ProdutoForm() {
  const { loading, add } = React.useContext(ListaProdutosContext);
  const { materiaPrima } = React.useContext(MateriaPrimaContext);
  const formRef = useRef<HTMLFormElement>(null);
  const [itensProdutoMateria, setItensProdutoMateria] = React.useState<
    Item[] | undefined
  >();
  const theme = useTheme();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (itensProdutoMateria) {
      await add({
        nome: data.get('nome') as string,
        descricao: data.get('descricao') as string,
        valor: parseFloat(data.get('valor') as string) * 100,
        materia_prima: itensProdutoMateria.map((e) => {
          const materia = materiaPrima.find((m) => m.nome === e.nome);
          if (!materia) {
            throw new Error('');
          }
          return { id: materia.id, quantidade: e.quantidade };
        }),
      });
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    setItensProdutoMateria(undefined);
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
          {itensProdutoMateria?.map((e) => {
            return (
              <Grid item xs={12} key={e.nome}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Box flex={1} marginLeft={theme.spacing(2)}>
                    <Typography>
                      {e.quantidade} {e.nome}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => {
                      setItensProdutoMateria((prev) =>
                        prev?.filter((m) => m.nome !== e.nome),
                      );
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <MateriaPrimaForm
          submit={(item: Item) => {
            const find = itensProdutoMateria?.find((e) => e.nome === item.nome);
            if (!find)
              setItensProdutoMateria((prev) =>
                prev ? [...prev, item] : [item],
              );
          }}
        />
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

function MateriaPrimaForm(props: { submit: (item: Item) => void }) {
  const { materiaPrima } = React.useContext(MateriaPrimaContext);
  const [materia, setMateria] = React.useState('');
  const [quantidade, setQuantidade] = React.useState(0);

  const handleSubmit = () => {
    if (quantidade > 0) {
      props.submit({ nome: materia, quantidade });
    }
    setQuantidade(0);
  };
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={7}>
        <Autocomplete
          size="small"
          fullWidth
          disablePortal
          id="combo-box-demo"
          options={materiaPrima.map((e) => {
            return { label: e.nome, id: e.id };
          })}
          getOptionLabel={(option) => option.label}
          onInputChange={(_e, v) => {
            setMateria(v);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Materia prima" fullWidth></TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          required
          fullWidth
          value={quantidade}
          id="quantidade"
          label="Quantidade"
          name="quantidade"
          type="number"
          onChange={(e) => setQuantidade(parseInt(e.target.value))}
        />
      </Grid>
      <Grid item xs={1} justifyContent={'center'} display={'flex'}>
        <IconButton onClick={() => handleSubmit()}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
