import { GraficoFilter } from '@/modules/dashboard/store/filter.store';
import {
  doceMeses,
  Filters,
  seisMeses,
  tresMeses,
} from '@/modules/dashboard/utils/table-filters';
import { NextApiRequest, NextApiResponse } from 'next';
import { pulsoData } from './data/data';
import {
  filterByCurrentYear,
  filterByLastSixMonths,
} from './utils/filter-pulso';
import { randomUUID } from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { filter } = req.query as {
      filter: GraficoFilter;
    };

    let tableFilter: Filters[] = [];
    let tableData = filterByCurrentYear(pulsoData);

    switch (filter) {
      case 'PULSO':
        tableFilter = tresMeses;
        tableData = filterByLastSixMonths(pulsoData, 'Todo', 3);
        break;
      case '6M':
        tableFilter = seisMeses;
        tableData = filterByLastSixMonths(pulsoData);
        break;
      case '1A':
        tableFilter = doceMeses;
        tableData = filterByCurrentYear(pulsoData);
        break;
    }

    tableData.values = [
      ...tableData.values,
      {
        id: randomUUID(),
        cashAcumulado: tableData.values.reduce(
          (acc, cur) => acc + cur.cashAcumulado,
          0
        ),
        diaDiez: tableData.values.reduce((acc, cur) => acc + cur.diaDiez, 0),
        diaUno: tableData.values.reduce((acc, cur) => acc + cur.diaUno, 0),
        diaVeinte: tableData.values.reduce(
          (acc, cur) => acc + cur.diaVeinte,
          0
        ),
        fecha: 'Total',
      },
    ];

    res.status(200).json({
      data: {
        tableData,
        tableFilter,
      },
    });
    return;
  }

  res.status(404).json({ message: 'Not found' });
}
