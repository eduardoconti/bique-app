import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TablePagination } from '@mui/material';
import { Fornecedor, FornecedorContext } from '@/context/fornecedores-context';

export default function ListaFornecedoresTable() {
  const { fornecedor } = React.useContext(FornecedorContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell size="small" sx={{ fontWeight: 'bold' }}>
                Nome
              </TableCell>
              <TableCell size="small" sx={{ fontWeight: 'bold' }}>
                Email
              </TableCell>
              <TableCell size="small" sx={{ fontWeight: 'bold' }}>
                Telefone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fornecedor
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <ProdutoLinha row={row} key={row.id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={fornecedor.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function ProdutoLinha({ row }: { row: Fornecedor }) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">{row.nome}</TableCell>
        <TableCell size="small">{row.email}</TableCell>
        <TableCell size="small">{row.telefone}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
