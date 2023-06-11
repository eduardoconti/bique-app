import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Collapse, IconButton, TablePagination } from '@mui/material';

import {
  ListaPedidos,
  ListaPedidosContext,
} from '@/context/lista-pedido-context';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatData } from '@/services/utils/data';

export default function ListaPedidosTable() {
  const { pedidos } = React.useContext(ListaPedidosContext);
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
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Valor
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Data entrega</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                Itens
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <PedidoLinha row={row} key={row.id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={pedidos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function PedidoLinha({ row }: { row: ListaPedidos }) {
  const [mostrarItens, setMostraItens] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">{row.nome}</TableCell>
        <TableCell size="small" align="right">
          {row.valor}
        </TableCell>
        <TableCell size="small">{row.status}</TableCell>
        <TableCell size="small">
          {formatData(row.data_entrega as Date)}
        </TableCell>
        <TableCell size="small" align="center">
          <IconButton
            aria-label="spanning"
            size="small"
            onClick={() => setMostraItens(!mostrarItens)}
          >
            {mostrarItens ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={mostrarItens} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    size="small"
                    align="left"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Produto
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Quantidade
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Valor unitario
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Total item
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.item_pedido.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell size="small" align="left">
                        {item.produto}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {item.quantidade}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {item.valor_unitario}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {item.total}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
