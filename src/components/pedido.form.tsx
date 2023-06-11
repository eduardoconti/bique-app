import { ListaPedidosContext } from '@/context/lista-pedido-context';
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
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ClienteContext } from '@/context/clientes-context';
import RemoveIcon from '@mui/icons-material/Remove';
import { ListaProdutosContext } from '@/context/lista-produto-context';

type Item = {
  idProduto: string;
  quantidade: number;
  nome: string;
};

type Inputs = {
  idCliente: string;
  dataEntrega: string;
};

export default function PedidoForm() {
  const { register, handleSubmit } = useForm<Inputs>();

  const { loading, add } = React.useContext(ListaPedidosContext);
  const theme = useTheme();
  const [idCliente, setIdCliente] = React.useState<string>();
  const { cliente } = React.useContext(ClienteContext);
  const [itens, setItens] = React.useState<Item[]>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (itens) {
      await add({
        id_cliente: idCliente as string,
        data_entrega: data?.dataEntrega
          ? new Date(data?.dataEntrega)
          : undefined,
        item_pedido: itens?.map((e) => {
          return {
            id_produto: e.idProduto,
            quantidade: e.quantidade,
          };
        }),
      });
    }
  };
  return (
    <Paper elevation={1} sx={{ padding: theme.spacing(2) }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              getOptionLabel={(option) => option.nome}
              disablePortal
              id="idCliente"
              options={cliente}
              fullWidth
              onChange={(_e, value) => {
                setIdCliente(value?.id);
              }}
              renderInput={(params) => {
                return <TextField {...params} placeholder="Cliente" />;
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="dataEntrega"
              label="Data entrega"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register('dataEntrega', { required: false })}
            />
          </Grid>
          {itens?.map((e) => {
            return (
              <Grid item xs={12} key={e.idProduto}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Box flex={1} marginLeft={theme.spacing(2)}>
                    <Typography>
                      {e.quantidade} - {e.nome}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => {
                      console.log(`clicked`);
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
            const find = itens?.find((e) => e.idProduto === item.idProduto);
            if (!find)
              setItens((prev) => {
                const itemRequest = {
                  idProduto: item.idProduto,
                  quantidade: item.quantidade,
                  nome: item.nome,
                };
                return prev ? [...prev, itemRequest] : [itemRequest];
              });
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
  const { produtos } = React.useContext(ListaProdutosContext);
  const [idProduto, setIdProduto] = React.useState<string>();
  const [quantidade, setQuantidade] = React.useState<number>(0);

  const handleSubmit = () => {
    if (quantidade && idProduto) {
      const produto = produtos.find((e) => e.id === idProduto);
      if (produto) props.submit({ idProduto, quantidade, nome: produto?.nome });
    }
    setQuantidade(0);
  };
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={7}>
        <Autocomplete
          size="small"
          fullWidth
          options={produtos}
          disablePortal
          id="produto"
          getOptionLabel={(option) => option.nome}
          onChange={(_e, v) => {
            setIdProduto(v?.id);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Produto" fullWidth></TextField>
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
