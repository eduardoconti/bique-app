import Head from 'next/head';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import ListaPedidosTable from '@/components/lista-pedidos-table';
import { ListaPedidosProvider } from '@/context/lista-pedido-context';
import PedidoForm from '@/components/pedido.form';
import { ClienteProvider } from '@/context/clientes-context';
import { ListaProdutosProvider } from '@/context/lista-produto-context';

export default function Home() {
  const theme = useTheme();
  return (
    <ListaPedidosProvider>
      <Head>
        <title>Pedidos</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Pedidos
        </Typography>
        <Grid container spacing={2} alignItems={'flex-start'}>
          <Grid item xs={12} sm={8}>
            <ListaPedidosTable />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ClienteProvider>
              <ListaProdutosProvider>
                <PedidoForm />
              </ListaProdutosProvider>
            </ClienteProvider>
          </Grid>
        </Grid>
      </Box>
    </ListaPedidosProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
