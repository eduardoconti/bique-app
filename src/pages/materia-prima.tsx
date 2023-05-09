import { Box, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
export default function SignIn() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Matéria prima</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Matéria prima
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
