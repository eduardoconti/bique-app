import Head from 'next/head';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Dashboard
        </Typography>
      </Box>
    </>
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
