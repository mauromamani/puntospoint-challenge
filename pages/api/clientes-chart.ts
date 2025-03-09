import type { NextApiRequest, NextApiResponse } from 'next';
import { clientesData } from './data/data';
import { GraficoFilter } from '@/modules/dashboard/store/filter.store';
import {
  DayFilter,
  filterByCurrentMonth,
  filterByCurrentYear,
  filterByLastSevenDays,
  filterByLastSixMonths,
  filterByToday,
} from './utils/filter-clientes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let data = filterByCurrentYear(clientesData);
    const filter = req.query.filter as GraficoFilter;
    const subFilter = req.query.subFilter as string;

    switch (filter) {
      case 'HOY':
        data = filterByToday(clientesData);
        break;
      case '7D':
        data = filterByLastSevenDays(clientesData, subFilter as DayFilter);
        break;

      case 'Este mes':
        data = filterByCurrentMonth(clientesData);
        break;

      case '6M':
        data = filterByLastSixMonths(clientesData, subFilter);
        break;

      case '1A':
        data = filterByCurrentYear(clientesData, subFilter);
        break;
    }

    res.status(200).json({ data });
    return;
  }

  res.status(404).json({ message: 'Not found' });
}
