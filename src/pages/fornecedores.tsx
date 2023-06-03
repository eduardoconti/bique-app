import Head from 'next/head';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { FornecedorProvider } from '@/context/fornecedores-context';
import ListaFornecedoresTable from '@/components/lista-fornecedores-table';
import FornecedorForm from '@/components/fornecedor-form';

export default function Fornecedores() {
  const theme = useTheme();
  return (
    <FornecedorProvider>
      <Head>
        <title>Fornecedores</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Fornecedores
        </Typography>
        <Grid container spacing={2} alignItems={'flex-start'}>
          <Grid item xs={12} sm={8}>
            <ListaFornecedoresTable />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FornecedorForm />
          </Grid>
        </Grid>
      </Box>
    </FornecedorProvider>
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
