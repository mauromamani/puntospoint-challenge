import { Filters } from '@/modules/dashboard/utils/table-filters';

export interface GetTransaccionesDataResponse {
  data: {
    labels: string[];
    values: Partial<Transaccion>[];
  };
}

export interface GetTransaccionesYTDYTGDataResponse {
  data: {
    labels: string[];
    values: Partial<{
      type: string;
      previous: number;
      current: number;
    }>[];
  }[];
}

export interface GetTransaccionesTableDataResponse {
  data: TableData2;
}

export interface TableData2 {
  tableFilter: Filters[];
  tableData: {
    labels: string[];
    values: Partial<Transaccion>[];
  };
}

export interface Transaccion {
  id: number;
  fecha: string;
  transacciones: number;
  dineroTotal: number;
  ventas: number;
  devoluciones: number;
  cashbackAcumulado: number;
  cashbackGenerado: number;
  cashbackTotal: number;
}
