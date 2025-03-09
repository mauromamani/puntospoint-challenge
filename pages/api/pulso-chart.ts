import type { NextApiRequest, NextApiResponse } from 'next';
import { pulsoData } from './data/data';
import { GraficoFilter } from '@/modules/dashboard/store/filter.store';
import {
  filterByCurrentYear,
  filterByLastSixMonths,
} from './utils/filter-pulso';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let data = filterByCurrentYear(pulsoData);
    const filter = req.query.filter as GraficoFilter;
    const subFilter = req.query.subFilter as string;

    switch (filter) {
      case 'PULSO':
        data = filterByLastSixMonths(pulsoData, subFilter, 3);
        break;

      case '6M':
        data = filterByLastSixMonths(pulsoData, subFilter);
        break;

      case '1A':
        data = filterByCurrentYear(pulsoData, subFilter);
        break;
    }

    res.status(200).json({ data });
    return;
  }

  res.status(404).json({ message: 'Not found' });
}
