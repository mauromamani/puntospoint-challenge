import { Filters } from '@/modules/dashboard/utils/table-filters';

export interface GetPulsoDataResponse {
  data: {
    labels: string[];
    values: Partial<Pulso>[];
  };
}

//
export interface GetPulsoTableDataResponse {
  data: TableData3;
}

export interface TableData3 {
  tableFilter: Filters[];
  tableData: {
    labels: string[];
    values: Partial<Pulso>[];
  };
}

export interface Pulso {
  id: number | string;
  fecha: string;
  diaUno: number;
  diaDiez: number;
  diaVeinte: number;
  cashAcumulado: number;
}
