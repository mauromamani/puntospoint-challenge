import { Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import {
  formatCurrency,
  formatNumber,
  formatThousands,
} from '../../utils/numeral';

export const renderFilterColumns = (subtitle: string) => {
  return [
    {
      field: 'label',
      headerName: subtitle,
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <span>{params.value}</span>,
    },
  ] as GridColDef[];
};

export const transaccionesColumns: GridColDef[] = [
  {
    field: 'transacciones',
    headerName: 'Total',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <span>{formatNumber(params.value)}</span>,
  },
];

export const pulsoColumns: GridColDef[] = [
  {
    field: 'diaUno',
    headerName: 'Column 1',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
  {
    field: 'diaDiez',
    headerName: 'Column 2',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
  {
    field: 'diaVeinte',
    headerName: 'Column 3',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
  {
    field: 'cashAcumulado',
    headerName: 'Total',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
];

export const clientesColumns: GridColDef[] = [
  {
    field: 'clientesNuevos',
    headerName: 'Column 1',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <span>{formatNumber(params.value)}</span>,
  },
  {
    field: 'compraron',
    headerName: 'Column 2',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <span>{formatNumber(params.value)}</span>,
  },
  {
    field: 'noCompraron',
    headerName: 'Column 3',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <span>{formatNumber(params.value)}</span>,
  },
  {
    field: 'clientesTotales',
    headerName: 'Total',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <span>{formatNumber(params.value)}</span>,
  },
];

export const dineroColumns: GridColDef[] = [
  {
    field: 'ventas',
    headerName: 'Column 1',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
  {
    field: 'devoluciones',
    headerName: 'Column 2',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
  {
    field: 'dineroTotal',
    headerName: 'Total',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
];

export const cashbackColumns: GridColDef[] = [
  {
    field: 'cashbackGenerado',
    headerName: 'Column 1',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
  {
    field: 'cashbackTotal',
    headerName: 'Total',
    width: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) =>
      !!params.value ? (
        <Tooltip title={formatThousands(params.value)} placement='top-start'>
          <span>{formatCurrency(params.value)}</span>
        </Tooltip>
      ) : (
        <span>-</span>
      ),
  },
];
