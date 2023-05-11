import ListaMateriaPrimaTable from '@/components/lista-materia-prima-table';
import MateriaPrimaForm from '@/components/materia-prima-form';
import { MateriaPrimaProvider } from '@/context/materia-prima-context';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
export default function SignIn() {
  const theme = useTheme();
  return (
    <MateriaPrimaProvider>
      <Head>
        <title>Matéria prima</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
          Matéria prima
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <ListaMateriaPrimaTable />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MateriaPrimaForm />
          </Grid>
        </Grid>
      </Box>
    </MateriaPrimaProvider>
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
