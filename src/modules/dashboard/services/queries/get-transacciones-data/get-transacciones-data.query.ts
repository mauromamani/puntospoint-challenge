import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  GetTransaccionesDataResponse,
  GetTransaccionesTableDataResponse,
  GetTransaccionesYTDYTGDataResponse,
} from './get-transacciones-data.types';
import { GraficoFilter } from '@/modules/dashboard/store/filter.store';
import { AllFilter } from '@/modules/dashboard/store/chart.store';

export const useGetTransaccionesData = (
  filter: string,
  subFilter: string = 'Todo'
) => {
  return useQuery({
    queryKey: ['transacciones-chart-data', { filter }],
    queryFn: async () => {
      const { data } = await axios.get<GetTransaccionesDataResponse>(
        `/api/transacciones-chart?filter=${filter}&subFilter=${subFilter}`
      );

      return data.data;
    },
  });
};

export const useGetTransaccionesYTDYTGData = (filter: AllFilter) => {
  return useQuery({
    queryKey: ['transacciones-ytd-ytg-chart-data'],
    queryFn: async () => {
      const { data } = await axios.get<GetTransaccionesYTDYTGDataResponse>(
        `/api/transacciones/ytd-ytg?filter=${filter}`
      );

      return data.data;
    },
  });
};

export const useGetTransaccionesTableData = (filter: GraficoFilter) => {
  return useQuery({
    queryKey: ['transacciones-table-data', { filter }],
    queryFn: async () => {
      const { data } = await axios.get<GetTransaccionesTableDataResponse>(
        `/api/transacciones-table?filter=${filter}`
      );

      return data.data;
    },
  });
};
