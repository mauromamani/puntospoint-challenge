import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetInfoCardsResponse } from './get-info-cards.types';

export const useGetInfoCards = () => {
  return useQuery({
    queryKey: ['info-cards-data'],
    queryFn: async () => {
      const { data } = await axios.get<GetInfoCardsResponse>(`/api/info-cards`);

      return data.data;
    },
  });
};
