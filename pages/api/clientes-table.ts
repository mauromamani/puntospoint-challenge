import { GraficoFilter } from '@/modules/dashboard/store/filter.store';
import {
  doceMeses,
  esteMes,
  Filters,
  hoy,
  seisMeses,
  sieteDias,
} from '@/modules/dashboard/utils/table-filters';
import { NextApiRequest, NextApiResponse } from 'next';
import { clientesData } from './data/data';
import {
  filterByCurrentMonth,
  filterByCurrentYear,
  filterByLastSevenDays,
  filterByLastSixMonths,
  filterByToday7Ranges,
} from './utils/filter-clientes';
import { randomUUID } from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { filter } = req.query as {
      filter: GraficoFilter;
    };

    let tableFilter: Filters[] = [];
    let tableData = filterByCurrentYear(clientesData);

    switch (filter) {
      case 'HOY':
        tableFilter = hoy;
        tableData = filterByToday7Ranges(clientesData);
        break;
      case '7D':
        tableFilter = sieteDias;
        tableData = filterByLastSevenDays(clientesData);
        break;
      case 'Este mes':
        tableFilter = esteMes;
        tableData = filterByCurrentMonth(clientesData);
        break;
      case '6M':
        tableFilter = seisMeses;
        tableData = filterByLastSixMonths(clientesData);
        break;
      case '1A':
        tableFilter = doceMeses;
        tableData = filterByCurrentYear(clientesData);
        break;
    }

    tableData.values = [
      ...tableData.values,
      {
        id: randomUUID(),
        cashbackAcumulado: tableData.values.reduce(
          (acc, cur) => acc + cur.cashbackAcumulado,
          0
        ),
        cashbackGenerado: tableData.values.reduce(
          (acc, cur) => acc + cur.cashbackGenerado,
          0
        ),
        cashbackTotal: tableData.values.reduce(
          (acc, cur) => acc + cur.cashbackTotal,
          0
        ),
        clientesNuevos: tableData.values.reduce(
          (acc, cur) => acc + cur.clientesNuevos,
          0
        ),
        clientesTotales: tableData.values.reduce(
          (acc, cur) => acc + cur.clientesTotales,
          0
        ),
        compraron: tableData.values.reduce(
          (acc, cur) => acc + cur.compraron,
          0
        ),
        devoluciones: tableData.values.reduce(
          (acc, cur) => acc + cur.devoluciones,
          0
        ),
        dineroTotal: tableData.values.reduce(
          (acc, cur) => acc + cur.dineroTotal,
          0
        ),
        fecha: 'Total',
        noCompraron: tableData.values.reduce(
          (acc, cur) => acc + cur.noCompraron,
          0
        ),
        ventas: tableData.values.reduce((acc, cur) => acc + cur.ventas, 0),
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
