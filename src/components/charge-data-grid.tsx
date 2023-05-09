import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Theme, Typography, useTheme } from '@mui/material';

import { amountBrl } from '@/services/utils/amount';
import Surface from '@/components/surface';
const ChipStatus = ({
  value,
}: {
  value: 'PAYED' | 'ACTIVE' | 'FAILED' | 'PENDING';
}) => {
  const theme = useTheme();
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: retrievChipColor(value, theme),
          boxShadow:
            value === 'PAYED'
              ? `0 0 6px 1px ${retrievChipColor(value, theme)}`
              : `0 0 6px 1px ${retrievChipColor(value, theme)}`,
        }}
      >
        <Box
          position={'absolute'}
          width={6}
          height={6}
          sx={{
            backgroundColor: 'rgb(255,255,255,0.6)',
            boxShadow: `0 0 6px 1px #FFF`,
          }}
          borderRadius={'50%'}
          top={1}
        />
      </Box>
      <Typography marginLeft={1} variant="subtitle2">
        {value}
      </Typography>
    </Box>
  );
};
const retrievChipColor = (
  status: 'PAYED' | 'ACTIVE' | 'FAILED' | 'PENDING',
  theme: Theme,
) => {
  const colorType = theme.palette.mode;
  if (status === 'PAYED') {
    return theme.palette.success[`${colorType}`];
  }
  if (status === 'ACTIVE' || status === 'PENDING') {
    return theme.palette.warning[`${colorType}`];
  }

  if (status === 'FAILED') {
    return theme.palette.error[`${colorType}`];
  }

  return 'default';
};
const columns: GridColDef[] = [
  {
    field: 'created_at',
    headerName: 'Created',
    flex: 1,
    renderCell: ({ formattedValue }) => {
      const formato = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      return (
        <Typography variant="subtitle2">
          {formato.format(new Date(formattedValue as string)).replace(',', ' ')}
        </Typography>
      );
    },
  },
  { field: 'id', headerName: 'Charge Id', flex: 2 },
  {
    field: 'provider',
    headerName: 'Provider',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    renderCell: ({ formattedValue }) => {
      return (
        <Typography variant="subtitle2">{amountBrl(formattedValue)}</Typography>
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: ({ formattedValue }) => {
      return <ChipStatus value={formattedValue} />;
    },
  },
  {
    field: 'e2e_id',
    headerName: 'Authorization code',
    flex: 2,
  },
];


export default function DataGridCharge() {
  const data: any[] = [];
  const theme = useTheme();

  return (
    <Surface>
      <DataGrid
        density="compact"
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          color: theme.palette.text.primary,
          height: 400,
        }}
      />
    </Surface>
  );
}
