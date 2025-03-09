import {
  BarSeriesType,
  LineSeriesType,
  PieSeriesType,
  PieValueType,
  ScatterSeriesType,
} from '@mui/x-charts';
import { MakeOptional } from '@mui/x-charts/internals';

export const clientesChart: BarSeriesType[] = [
  {
    id: 'clientesTotales',
    type: 'bar',
    label: 'Clientes totales',
    dataKey: 'clientesTotales',
    color: '#EB3535',
    yAxisKey: 'y-axis-id',
  },
  {
    id: 'clientesNuevos',
    type: 'bar',
    label: 'Clientes Nuevos',
    color: '#2DCF5A',
    dataKey: 'clientesNuevos',
    yAxisKey: 'y-axis-id',
  },
  {
    id: 'compraron',
    type: 'bar',
    label: 'Compraron',
    dataKey: 'compraron',
    color: '#348deb',
    yAxisKey: 'y-axis-id',
  },
  {
    id: 'noCompraron',
    type: 'bar',
    label: 'No Compraron',
    dataKey: 'noCompraron',
    color: '#ed7834',
    yAxisKey: 'y-axis-id',
  },
];

export const transaccionesChart: BarSeriesType[] = [
  {
    id: 'transacciones',
    type: 'bar',
    label: 'Transacciones',
    dataKey: 'transacciones',
    color: '#348deb',
    yAxisKey: 'y-axis-id',
  },
];

export const pulsoChart: BarSeriesType[] = [
  {
    id: 'diaUno',
    type: 'bar',
    label: 'Dia 01',
    dataKey: 'diaUno',
    color: '#2dce5a',
    yAxisId: 'y-axis-right',
  },
  {
    id: 'diaDiez',
    type: 'bar',
    label: 'Día 10',
    dataKey: 'diaDiez',
    color: '#348deb',
    yAxisId: 'y-axis-right',
  },
  {
    id: 'diaVeinte',
    type: 'bar',
    label: 'Día 20',
    dataKey: 'diaVeinte',
    color: '#ec7636',
    yAxisId: 'y-axis-right',
  },
];

export const pulsoLinesChart: LineSeriesType[] = [
  {
    id: 'cashAcumulado',
    type: 'line',
    label: 'Cashback acumulado',
    dataKey: 'cashAcumulado',
    curve: 'linear',
    color: '#7b33e5',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
];

export const dineroChart: LineSeriesType[] = [
  {
    id: 'dineroTotal',
    type: 'line',
    label: 'Dinero total',
    dataKey: 'dineroTotal',
    curve: 'linear',
    color: '#EB3535',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
  {
    id: 'devoluciones',
    type: 'line',
    label: 'Devoluciones',
    dataKey: 'devoluciones',
    curve: 'linear',
    color: '#7A35EB',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
  {
    id: 'ventas',
    type: 'line',
    label: 'Ventas',
    dataKey: 'ventas',
    curve: 'linear',
    color: '#48454E',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
];

export const ytdYtgChart: BarSeriesType[] = [
  {
    id: 'previous',
    type: 'bar',
    label: '2024',
    dataKey: 'previous',
    color: '#EB3535',
  },
  {
    id: 'current',
    type: 'bar',
    label: '2025',
    dataKey: 'current',
    color: '#7A35EB',
  },
];

export const cashbackChart: LineSeriesType[] = [
  {
    id: 'cashbackAcumulado',
    type: 'line',
    label: 'Cashback acumulado',
    dataKey: 'cashbackAcumulado',
    curve: 'linear',
    color: '#EB3535',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
  {
    id: 'cashbackGenerado',
    type: 'line',
    label: 'Cashback generado',
    dataKey: 'cashbackGenerado',
    curve: 'linear',
    color: '#7A35EB',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
  {
    id: 'ventas',
    type: 'line',
    label: 'Ventas',
    dataKey: 'ventas',
    curve: 'linear',
    color: '#EB35AD',
    showMark: true,
    yAxisId: 'y-axis-right',
  },
];

export type Serie =
  | BarSeriesType
  | LineSeriesType
  | ScatterSeriesType
  | PieSeriesType<MakeOptional<PieValueType, 'id'>>;

export const clientesLegends = clientesChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));

export const transaccionesLegends = transaccionesChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));

export const ytdYtgLegends = ytdYtgChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));

export const dineroLegends = dineroChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));

export const cashbackLegends = cashbackChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));

export const pulsoLegends = pulsoChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));

export const pulsoLinesLegends = pulsoLinesChart.map((item) => ({
  dataKey: item.dataKey,
  fill: item.color,
  label: item.label,
  selected: true,
}));
