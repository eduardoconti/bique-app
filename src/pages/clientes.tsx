import Head from 'next/head';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import ListaClientesTable from '@/components/lista-clientes-table';
import { ClienteProvider } from '@/context/clientes-context';
import ClienteForm from '@/components/cliente-form';

export default function Home() {
  const theme = useTheme();
  return (
    <ClienteProvider>
      <Head>
        <title>Clientes</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Clientes
        </Typography>
        <Grid container spacing={2} alignItems={'flex-start'}>
          <Grid item xs={12} sm={8}>
            <ListaClientesTable />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ClienteForm />
          </Grid>
        </Grid>
      </Box>
    </ClienteProvider>
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
