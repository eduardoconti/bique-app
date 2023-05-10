import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TablePagination } from '@mui/material';

import {
  ListaMateriaPrima,
  MateriaPrimaContext,
} from '@/context/materia-prima-context';

export default function ListaMateriaPrimaTable() {
  const { materiaPrima } = React.useContext(MateriaPrimaContext);
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
        <Table sx={{ minWidth: 400 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Valor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materiaPrima
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
        count={materiaPrima.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function ProdutoLinha({ row }: { row: ListaMateriaPrima }) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">{row.nome}</TableCell>
        <TableCell size="small">{row.descricao}</TableCell>
        <TableCell size="small" align="right">
          {row.valor_unitario}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
