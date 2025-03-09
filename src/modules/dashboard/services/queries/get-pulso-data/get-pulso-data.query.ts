import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  GetPulsoDataResponse,
  GetPulsoTableDataResponse,
} from './get-pulso-data.types';
import { GraficoFilter } from '@/modules/dashboard/store/filter.store';

export const useGetPulsoData = (filter: string, subFilter: string = 'Todo') => {
  return useQuery({
    queryKey: ['pulso-chart-data', { filter, subFilter }],
    queryFn: async () => {
      const { data } = await axios.get<GetPulsoDataResponse>(
        `/api/pulso-chart?filter=${filter}&subFilter=${subFilter}`
      );

      return data.data;
    },
  });
};

export const useGetPulsoTableData = (filter: GraficoFilter) => {
  return useQuery({
    queryKey: ['pulso-table-data', { filter }],
    queryFn: async () => {
      const { data } = await axios.get<GetPulsoTableDataResponse>(
        `/api/pulso-table?filter=${filter}`
      );

      return data.data;
    },
  });
};
