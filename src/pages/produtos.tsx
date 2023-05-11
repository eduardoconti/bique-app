import ListaProdutosTable from '@/components/lista-produtos-table';
import ProdutoForm from '@/components/produto-form';
import { ListaProdutosProvider } from '@/context/lista-produto-context';
import { MateriaPrimaProvider } from '@/context/materia-prima-context';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
export default function SignIn() {
  const theme = useTheme();
  return (
    <ListaProdutosProvider>
      <MateriaPrimaProvider>
        <Head>
          <title>Produtos</title>
        </Head>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" sx={{ marginBottom: theme.spacing(1) }}>
            Produtos
          </Typography>
          <Grid container spacing={2} alignItems={'flex-start'}>
            <Grid item xs={12} sm={8}>
              <ListaProdutosTable />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ProdutoForm />
            </Grid>
          </Grid>
        </Box>
      </MateriaPrimaProvider>
    </ListaProdutosProvider>
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
