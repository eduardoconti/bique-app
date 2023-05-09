import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

interface Produto {
  nome: string;
  descricao: string;
  valor: string;
  itens_materia_prima: any[];
}

const rows: Produto[] = [
  {
    nome: 'Cinderela',
    descricao: 'Buque com rosas vermelhras e ouro branco',
    valor: '80.00',
    itens_materia_prima: [
      { descricao: 'ouro branco', quantidade: 3 },
      { descricao: 'rosas', quantidade: 6 },
      { descricao: 'embalagem', quantidade: 1 },
      { descricao: 'suporte bexiga', quantidade: 3 },
    ],
  },
  {
    nome: 'Branca de neve',
    descricao: 'Buque com rosas brancas e ferrero',
    valor: '100.00',
    itens_materia_prima: [
      { descricao: 'ferrero', quantidade: 3 },
      { descricao: 'rosas', quantidade: 6 },
      { descricao: 'embalagem', quantidade: 1 },
      { descricao: 'suporte bexiga', quantidade: 3 },
    ],
  },
  {
    nome: 'Rapunzel',
    descricao: 'Buque com rosas',
    valor: '40.00',
    itens_materia_prima: [
      { descricao: 'rosas', quantidade: 6 },
      { descricao: 'embalagem', quantidade: 1 },
    ],
  },
];

export default function SpanningTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: 600,
      }}
    >
      <Table sx={{ minWidth: 400 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Descricao</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              Valor
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Materiais</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const [mostrarItens, setMostraItens] =
              React.useState<boolean>(false);
            return (
              <>
                <TableRow key={row.descricao}>
                  <TableCell size="small">{row.nome}</TableCell>
                  <TableCell size="small">{row.descricao}</TableCell>
                  <TableCell size="small" align="right">
                    {row.valor}
                  </TableCell>
                  <TableCell size="small" align="center">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => setMostraItens(!mostrarItens)}
                    >
                      {mostrarItens ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                {mostrarItens ? (
                  <>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell
                        size="small"
                        align="right"
                        sx={{ fontWeight: 'bold' }}
                      >
                        Material
                      </TableCell>
                      <TableCell
                        size="small"
                        align="right"
                        sx={{ fontWeight: 'bold' }}
                      >
                        Quantidade
                      </TableCell>
                    </TableRow>

                    {row.itens_materia_prima.map((item) => (
                      <TableRow key={item.descricao}>
                        <TableCell />
                        <TableCell />
                        <TableCell size="small" align="right">
                          {item.descricao}
                        </TableCell>
                        <TableCell size="small" align="right">
                          {item.quantidade}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : null}
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
