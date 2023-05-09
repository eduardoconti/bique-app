import SpanningTable from '@/components/table';
import { Box, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
export default function SignIn() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Produtos
        </Typography>
        <SpanningTable></SpanningTable>
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
