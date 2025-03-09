import { Filters } from '@/modules/dashboard/utils/table-filters';

export interface GetClientesDataResponse {
  data: {
    labels: string[];
    values: Partial<Clientes>[];
  };
}

//
export interface GetClientesTableDataResponse {
  data: TableData;
}

export interface TableData {
  tableFilter: Filters[];
  tableData: {
    labels: string[];
    values: Partial<Clientes>[];
  };
}

export interface Clientes {
  fecha: string;
  clientesTotales: number;
  clientesNuevos: number;
  compraron: number;
  noCompraron: number;
  dineroTotal: number;
  ventas: number;
  devoluciones: number;
  cashbackAcumulado: number;
  cashbackGenerado: number;
  cashbackTotal: number;
}
