import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  GetClientesDataResponse,
  GetClientesTableDataResponse,
} from './get-clientes-data.types';
import { GraficoFilter } from '@/modules/dashboard/store/filter.store';

export const useGetClientesData = (
  filter: string,
  subFilter: string = 'Todo'
) => {
  return useQuery({
    queryKey: ['clientes-chart-data', { filter, subFilter }],
    queryFn: async () => {
      const { data } = await axios.get<GetClientesDataResponse>(
        `/api/clientes-chart?filter=${filter}&subFilter=${subFilter}`
      );

      return data.data;
    },
  });
};

export const useGetClientesTableData = (filter: GraficoFilter) => {
  return useQuery({
    queryKey: ['clientes-table-data', { filter }],
    queryFn: async () => {
      const { data } = await axios.get<GetClientesTableDataResponse>(
        `/api/clientes-table?filter=${filter}`
      );

      return data.data;
    },
  });
};
