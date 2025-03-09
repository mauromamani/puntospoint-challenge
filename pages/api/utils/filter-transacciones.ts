import { AllFilter } from '@/modules/dashboard/store/chart.store';
import { randomInt, randomUUID } from 'crypto';
import {
  differenceInDays,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  getDate,
  getMonth,
  getYear,
  isLeapYear,
  isToday,
  isWithinInterval,
  parseISO,
  setMonth,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';

interface Transacciones {
  id: number | string;
  fecha: string;
  transacciones: number;
  dineroTotal: number;
  ventas: number;
  devoluciones: number;
  cashbackAcumulado: number;
  cashbackGenerado: number;
  cashbackTotal: number;
}

export const filterByToday = (data: Transacciones[]) => {
  const hoursRanges = [
    { label: '00:00', start: 0, end: 1 },
    { label: '01:00', start: 1, end: 2 },
    { label: '02:00', start: 2, end: 3 },
    { label: '03:00', start: 3, end: 4 },
    { label: '04:00', start: 4, end: 5 },
    { label: '05:00', start: 5, end: 6 },
    { label: '06:00', start: 6, end: 7 },
    { label: '07:00', start: 7, end: 8 },
    { label: '08:00', start: 8, end: 9 },
    { label: '09:00', start: 9, end: 10 },
    { label: '10:00', start: 10, end: 11 },
    { label: '11:00', start: 11, end: 12 },
    { label: '12:00', start: 12, end: 13 },
    { label: '13:00', start: 13, end: 14 },
    { label: '14:00', start: 14, end: 15 },
    { label: '15:00', start: 15, end: 16 },
    { label: '16:00', start: 16, end: 17 },
    { label: '17:00', start: 17, end: 18 },
    { label: '18:00', start: 18, end: 19 },
    { label: '19:00', start: 19, end: 20 },
    { label: '20:00', start: 20, end: 21 },
    { label: '21:00', start: 21, end: 22 },
    { label: '22:00', start: 22, end: 23 },
    { label: '23:00', start: 23, end: 24 },
  ];

  const todayData = data.filter((item) => {
    const date = parseISO(item.fecha);
    return isToday(date);
  });

  const result = {
    labels: hoursRanges.map((range) => range.label),
    values: hoursRanges.map(() => ({
      id: randomUUID(),
      fecha: '',
      transacciones: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
    })),
  };

  todayData.forEach((item) => {
    const date = parseISO(item.fecha);
    const hour = date.getHours();

    const rangeIndex = hoursRanges.findIndex(
      (range) => hour >= range.start && hour < range.end
    );

    if (rangeIndex !== -1) {
      const values = result.values[rangeIndex];
      values.fecha = format(item.fecha, 'EEE, d MMM HH:mm', { locale: es });
      values.id = randomUUID();
      values.transacciones += item.transacciones;
      values.dineroTotal += item.dineroTotal;
      values.ventas += item.ventas;
      values.devoluciones += item.devoluciones;
      values.cashbackAcumulado += item.cashbackAcumulado;
      values.cashbackGenerado += item.cashbackGenerado;
      values.cashbackTotal += item.cashbackTotal;
    }
  });

  return result;
};

export const filterByToday7Ranges = (data: Transacciones[]) => {
  const hoursRanges = [
    { label: '00:00 - 04:00', start: 0, end: 4 },
    { label: '04:00 - 08:00', start: 4, end: 8 },
    { label: '08:00 - 12:00', start: 8, end: 12 },
    { label: '12:00 - 16:00', start: 12, end: 16 },
    { label: '16:00 - 20:00', start: 16, end: 20 },
    { label: '20:00 - 24:00', start: 20, end: 24 },
  ];

  const todayData = data.filter((item) => {
    const date = parseISO(item.fecha);
    return isToday(date);
  });

  const result = {
    labels: hoursRanges.map((range) => range.label),
    values: hoursRanges.map(() => ({
      id: randomUUID(),
      fecha: '',
      transacciones: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
    })),
  };

  todayData.forEach((item) => {
    const date = parseISO(item.fecha);
    const hour = date.getHours();

    const rangeIndex = hoursRanges.findIndex(
      (range) => hour >= range.start && hour < range.end
    );

    if (rangeIndex !== -1) {
      const values = result.values[rangeIndex];
      values.id = randomUUID();
      values.fecha = format(item.fecha, 'EEE, d MMM HH:mm', { locale: es });

      values.transacciones += item.transacciones;
      values.dineroTotal += item.dineroTotal;
      values.ventas += item.ventas;
      values.devoluciones += item.devoluciones;
      values.cashbackAcumulado += item.cashbackAcumulado;
      values.cashbackGenerado += item.cashbackGenerado;
      values.cashbackTotal += item.cashbackTotal;
    }
  });

  return result;
};

export const filterByLastSevenDays = (
  data: Transacciones[],
  dayFilter: string = 'Todo'
) => {
  const today = new Date();
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, i);
    return {
      date,
      label: format(date, 'EEEE', { locale: es }),
      start: startOfDay(date),
      end: endOfDay(date),
    };
  });

  let filteredDays = lastSevenDays;
  if (dayFilter !== 'Todo') {
    filteredDays = lastSevenDays.filter(
      (day) => day.label.toLowerCase() === dayFilter.toLowerCase()
    );
  }

  const result = {
    labels: filteredDays.map((day) => day.label),
    values: filteredDays.map(() => ({
      id: randomUUID(),
      fecha: '',
      transacciones: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
    })),
  };

  data.forEach((item) => {
    const itemDate = parseISO(item.fecha);
    const dayIndex = filteredDays.findIndex((day) =>
      isWithinInterval(itemDate, { start: day.start, end: day.end })
    );
    if (dayIndex !== -1) {
      const values = result.values[dayIndex];
      values.id = randomUUID();
      values.fecha = format(item.fecha, 'EEE, d MMM HH:mm', { locale: es });
      values.transacciones += item.transacciones;
      values.dineroTotal += item.dineroTotal;
      values.ventas += item.ventas;
      values.devoluciones += item.devoluciones;
      values.cashbackAcumulado += item.cashbackAcumulado;
      values.cashbackGenerado += item.cashbackGenerado;
      values.cashbackTotal += item.cashbackTotal;
    }
  });

  if (dayFilter === 'Todo') {
    result.labels = result.labels.reverse();
    result.values = result.values.reverse();
  }

  return result;
};

export const filterByCurrentMonth = (data: Transacciones[]) => {
  const today = new Date();

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const result = {
    labels: daysInMonth.map((day) => getDate(day).toString()),
    values: daysInMonth.map(() => ({
      id: randomUUID(),
      fecha: '',
      transacciones: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
    })),
  };

  data.forEach((item) => {
    const itemDate = parseISO(item.fecha);

    if (isWithinInterval(itemDate, { start: monthStart, end: monthEnd })) {
      const dayOfMonth = getDate(itemDate);

      const dayIndex = dayOfMonth - 1;

      const values = result.values[dayIndex];
      values.id = randomUUID();
      values.fecha = format(item.fecha, 'EEE, d MMM HH:mm', { locale: es });
      values.transacciones += item.transacciones;
      values.dineroTotal += item.dineroTotal;
      values.ventas += item.ventas;
      values.devoluciones += item.devoluciones;
      values.cashbackAcumulado += item.cashbackAcumulado;
      values.cashbackGenerado += item.cashbackGenerado;
      values.cashbackTotal += item.cashbackTotal;
    }
  });

  return result;
};

export const filterByLastSixMonths = (
  data: Transacciones[],
  monthFilter: string = 'Todo'
) => {
  const today = new Date();
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
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
    values: filteredMonths.map(() => ({
      id: randomUUID(),
      fecha: '',
      transacciones: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
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
      values.transacciones += item.transacciones;
      values.dineroTotal += item.dineroTotal;
      values.ventas += item.ventas;
      values.devoluciones += item.devoluciones;
      values.cashbackAcumulado += item.cashbackAcumulado;
      values.cashbackGenerado += item.cashbackGenerado;
      values.cashbackTotal += item.cashbackTotal;
    }
  });

  if (monthFilter === 'Todo') {
    result.labels.reverse();
    result.values.reverse();
  }

  return result;
};

export const filterByCurrentYear = (
  data: Transacciones[],
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
    values: filteredMonths.map(() => ({
      id: randomUUID(),
      fecha: '',
      transacciones: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
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
        values.transacciones += item.transacciones;
        values.dineroTotal += item.dineroTotal;
        values.ventas += item.ventas;
        values.devoluciones += item.devoluciones;
        values.cashbackAcumulado += item.cashbackAcumulado;
        values.cashbackGenerado += item.cashbackGenerado;
        values.cashbackTotal += item.cashbackTotal;
      }
    }
  });

  return result;
};

export const filterYTDYTG = (_data: Transacciones[], _filter: AllFilter) => {
  const YTD = {
    labels: ['2024', '2025'],
    values: [
      {
        type: 'YTD',
        previous: randomInt(1000000, 9999999),
        current: randomInt(1000000, 9999999),
      },
    ],
  };

  const YTG = {
    labels: ['2024', '2025'],
    values: [
      {
        type: 'YTG',
        previous: randomInt(1000000, 9999999),
        current: randomInt(1000000, 9999999),
      },
    ],
  };

  return [YTD, YTG];
};
