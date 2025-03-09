import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ data: cardsData });
    return;
  }

  res.status(404).json({ message: 'Not found' });
}

const cardsData = [
  {
    mes: 'Noviembre',
    clientes: 81420,
    ventasTotales: 1100,
    montoTotal: '$70M',
    cashback: {
      acumulado: '$200,000',
      facturas: [
        {
          fecha: '01/11',
          monto: '$120,000',
        },
        {
          fecha: '10/11',
          monto: '$200,000',
        },
        {
          fecha: '20/11',
          monto: '$0',
        },
      ],
    },
  },
  {
    mes: 'Octubre',
    clientes: 81295,
    ventasTotales: 3800,
    montoTotal: '$170.84M',
    cashback: {
      acumulado: '$700,000',
      facturas: [
        {
          fecha: '01/10',
          monto: '$100,000',
        },
        {
          fecha: '10/10',
          monto: '$250,000',
        },
        {
          fecha: '20/10',
          monto: '$100,000',
        },
      ],
    },
  },
  {
    mes: 'Septiembre',
    clientes: 80995,
    ventasTotales: 4000,
    montoTotal: '$174.92M',
    cashback: {
      acumulado: '$450,000',
      facturas: [
        {
          fecha: '01/09',
          monto: '$85,000',
        },
        {
          fecha: '10/09',
          monto: '$90,000',
        },
      ],
    },
  },
];
