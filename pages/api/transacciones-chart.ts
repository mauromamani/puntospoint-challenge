import type { NextApiRequest, NextApiResponse } from 'next';
import { transaccionesData } from './data/data';

import { GraficoFilter } from '@/modules/dashboard/store/filter.store';
import {
  filterByCurrentMonth,
  filterByCurrentYear,
  filterByLastSevenDays,
  filterByLastSixMonths,
  filterByToday,
  filterYTDYTG,
} from './utils/filter-transacciones';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let data = filterByCurrentYear(transaccionesData);
    const filter = req.query.filter as GraficoFilter;
    const subFilter = req.query.subFilter as string;

    switch (filter) {
      case 'HOY':
        data = filterByToday(transaccionesData);
        break;
      case '7D':
        data = filterByLastSevenDays(transaccionesData, subFilter);
        break;

      case 'Este mes':
        data = filterByCurrentMonth(transaccionesData);
        break;

      case '6M':
        data = filterByLastSixMonths(transaccionesData, subFilter);
        break;

      case '1A':
        data = filterByCurrentYear(transaccionesData, subFilter);
        break;
    }

    res.status(200).json({ data });
    return;
  }

  res.status(404).json({ message: 'Not found' });
}
