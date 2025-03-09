import { format, getDaysInMonth, setMonth, subDays, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import { GraficoFilter } from '../store/filter.store';

export const renderHeaderTable = (filter: GraficoFilter) => {
  const header = {
    title: '',
    subTitle: '',
  };

  switch (filter) {
    case 'PULSO':
      header.title = 'Pulso';
      header.subTitle = 'Meses';
      break;
    case 'HOY':
      header.title = 'Hoy';
      header.subTitle = 'Horas';
      break;
    case '7D':
      header.title = '7 Días';
      header.subTitle = 'Semana';
      break;
    case 'Este mes':
      header.title = 'Este mes';
      header.subTitle = 'Días';
      break;
    case '6M':
      header.title = '6 Meses';
      header.subTitle = 'Meses';
      break;
    case '1A':
      header.title = '1 Año';
      header.subTitle = 'Meses';
      break;
    case 'MAX':
      header.title = 'MAX';
      header.subTitle = 'Todo';
      break;
    case 'Personalizado':
      header.title = 'Personalizado';
      header.subTitle = 'Todo';
      break;

    default:
      break;
  }

  return header;
};

export interface Filters {
  id: number;
  label: string | number;
}

export const hoy: Filters[] = [
  {
    label: '00:00 - 04:00',
    id: 3,
  },
  {
    label: '04:00 - 08:00',
    id: 4,
  },
  {
    label: '08:00 - 12:00',
    id: 5,
  },
  {
    label: '12:00 - 16:00',
    id: 6,
  },
  {
    label: '16:00 - 20:00',
    id: 7,
  },
  {
    label: '20:00 - 00:00',
    id: 8,
  },
  {
    label: 'Total',
    id: 9,
  },
];

export const sieteDias: Filters[] = [
  {
    label: 'Lunes',
    id: 3,
  },
  {
    label: 'Martes',
    id: 4,
  },
  {
    label: 'Miércoles',
    id: 5,
  },
  {
    label: 'Jueves',
    id: 6,
  },
  {
    label: 'Viernes',
    id: 7,
  },
  {
    label: 'Sábado',
    id: 8,
  },
  {
    label: 'Domingo',
    id: 0,
  },
  {
    label: 'Total',
    id: 10,
  },
];

const today = new Date();
const daysInMont = getDaysInMonth(today);

export const esteMes: Filters[] = [
  ...Array.from({ length: daysInMont }, (_, i) => ({
    label: i + 1,
    id: i + 3,
  })),

  {
    label: 'Total',
    id: 100,
  },
];

const obtenerUltimosSeisMeses = (length = 6) => {
  const fechaActual = new Date();
  const meses = [];

  for (let i = 0; i < length; i++) {
    const fecha = subMonths(fechaActual, i);
    const nombreMes = format(fecha, 'MMMM', { locale: es });
    meses.push({
      label: nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1),
      id: i + 3,
    });
  }

  return meses;
};

export const seisMeses: Filters[] = [
  ...obtenerUltimosSeisMeses(),
  {
    label: 'Total',
    id: 100,
  },
];

export const tresMeses: Filters[] = [
  ...obtenerUltimosSeisMeses(3),
  {
    label: 'Total',
    id: 100,
  },
];

const obtenerTodosMeses = () => {
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const meses = [];

  for (let i = 0; i < 12; i++) {
    const fecha = setMonth(new Date(añoActual, 0, 1), i);
    const nombreMes = format(fecha, 'MMMM', { locale: es });
    meses.push({
      label: nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1),
      id: i + 3,
    });
  }

  return meses;
};

export const doceMeses: Filters[] = [
  ...obtenerTodosMeses(),
  {
    label: 'Total',
    id: 100,
  },
];

// Filters for chat
const generarUltimosSieteDias = () => {
  const today = new Date();
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, i);
    const formated = format(date, 'EEEE', { locale: es });
    const day = formated.charAt(0).toUpperCase() + formated.slice(1);

    return {
      label: day,
    };
  });

  return lastSevenDays.reverse();
};

export const graficoFilterList = [
  {
    label: 'HOY',
    subItems: [],
  },
  {
    label: '7D',
    subItems: [{ label: 'Todo' }, ...generarUltimosSieteDias()],
  },
  {
    label: 'Este mes',
    subItems: [],
  },
  {
    label: '6M',
    subItems: [{ label: 'Todo' }, ...obtenerUltimosSeisMeses().reverse()],
  },
  {
    label: 'YTD/YTG',
    subItems: [],
  },
  {
    label: '1A',
    subItems: [{ label: 'Todo' }, ...obtenerTodosMeses()],
  },
  {
    label: 'MAX',
    subItems: [{ label: 'Todo' }],
  },
  {
    label: 'Personalizado',
    icon: InsertInvitationRoundedIcon,
    subItems: [],
  },
];

export const pulsoFilterList = [
  {
    label: 'PULSO',
    subItems: [{ label: 'Todo' }, ...obtenerUltimosSeisMeses(3).reverse()],
  },
  {
    label: '6M',
    subItems: [{ label: 'Todo' }, ...obtenerUltimosSeisMeses().reverse()],
  },
  {
    label: 'YTD/YTG',
    subItems: [],
  },
  {
    label: '1A',
    subItems: [{ label: 'Todo' }, ...obtenerTodosMeses()],
  },
  {
    label: 'MAX',
    subItems: [{ label: 'Todo' }],
  },
  {
    label: 'Personalizado',
    icon: InsertInvitationRoundedIcon,
    subItems: [],
  },
];
