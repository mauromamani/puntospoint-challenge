import type { NextApiRequest, NextApiResponse } from 'next';
import { transaccionesData } from '../data/data';

import { filterYTDYTG } from '../utils/filter-transacciones';
import { AllFilter } from '@/modules/dashboard/store/chart.store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const filter = req.query.filter as AllFilter;
    const data = filterYTDYTG(transaccionesData, filter);

    res.status(200).json({ data });
    return;
  }

  res.status(404).json({ message: 'Not found' });
}
