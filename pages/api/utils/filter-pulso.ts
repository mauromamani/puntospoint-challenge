import { randomUUID } from 'crypto';
import {
  endOfMonth,
  endOfYear,
  format,
  isWithinInterval,
  parseISO,
  setMonth,
  startOfMonth,
  startOfYear,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';

interface Pulso {
  id: number | string;
  fecha: string;
  diaUno: number;
  diaDiez: number;
  diaVeinte: number;
  cashAcumulado: number;
}

export const filterByLastSixMonths = (
  data: Pulso[],
  monthFilter: string = 'Todo',
  length: number = 6
) => {
  const today = new Date();
  const lastSixMonths = Array.from({ length }, (_, i) => {
    const date = subMonths(today, i);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return {
      date,
      label: format(date, 'MMMM yyyy', { locale: es }),
      monthName: format(date, 'MMMM', { locale: es }),
      start: monthStart,
      end: monthEnd,
    };
  });

  let filteredMonths = lastSixMonths;
  if (monthFilter !== 'Todo') {
    filteredMonths = lastSixMonths.filter(
      (month) => month.monthName.toLowerCase() === monthFilter.toLowerCase()
    );
  }

  const result = {
    labels: filteredMonths.map((month) => month.label),
    values: filteredMonths.map((_, idx) => ({
      id: randomUUID(),
      fecha: '',
      diaUno: 0,
      diaDiez: 0,
      diaVeinte: 0,
      cashAcumulado: 0,
    })),
  };

  data.forEach((item) => {
    const itemDate = parseISO(item.fecha);
    const monthIndex = filteredMonths.findIndex((month) =>
      isWithinInterval(itemDate, { start: month.start, end: month.end })
    );
    if (monthIndex !== -1) {
      const values = result.values[monthIndex];
      values.id = randomUUID();
      values.fecha = format(itemDate, 'MMMM', { locale: es });
      values.diaUno += item.diaUno;
      values.diaDiez += item.diaDiez;
      values.diaVeinte += item.diaVeinte;
      values.cashAcumulado += item.cashAcumulado;
    }
  });

  if (monthFilter === 'Todo') {
    result.labels.reverse();
    result.values.reverse();
  }

  return result;
};

export const filterByCurrentYear = (
  data: Pulso[],
  monthFilter: string = 'Todo'
) => {
  const today = new Date();
  const yearStart = startOfYear(today);
  const yearEnd = endOfYear(today);
  const monthsInYear = Array.from({ length: 12 }, (_, i) => {
    const date = setMonth(today, i);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return {
      date,
      label: format(date, 'MMMM', { locale: es }),
      start: monthStart,
      end: monthEnd,
    };
  });

  let filteredMonths = monthsInYear;
  if (monthFilter !== 'Todo') {
    filteredMonths = monthsInYear.filter(
      (month) => month.label.toLowerCase() === monthFilter.toLowerCase()
    );
  }

  const result = {
    labels: filteredMonths.map((month) => month.label),
    values: filteredMonths.map((_, idx) => ({
      id: randomUUID(),
      fecha: '',
      diaUno: 0,
      diaDiez: 0,
      diaVeinte: 0,
      cashAcumulado: 0,
    })),
  };

  data.forEach((item) => {
    const itemDate = parseISO(item.fecha);
    if (isWithinInterval(itemDate, { start: yearStart, end: yearEnd })) {
      const monthIndex = filteredMonths.findIndex((month) =>
        isWithinInterval(itemDate, { start: month.start, end: month.end })
      );
      if (monthIndex !== -1) {
        const values = result.values[monthIndex];
        values.id = randomUUID();
        values.fecha = format(itemDate, 'MMMM', { locale: es });
        values.diaUno += item.diaUno;
        values.diaDiez += item.diaDiez;
        values.diaVeinte += item.diaVeinte;
        values.cashAcumulado += item.cashAcumulado;
      }
    }
  });

  return result;
};
