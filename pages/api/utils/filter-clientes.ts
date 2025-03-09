import { randomUUID } from 'crypto';
import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  getDate,
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

interface Clientes {
  id: number | string;
  fecha: string;
  clientesTotales: number;
  clientesNuevos: number;
  compraron: number;
  noCompraron: number;
  dineroTotal: number;
  ventas: number;
  devoluciones: number;
  cashbackAcumulado: number;
  cashbackGenerado: number;
  cashbackTotal: number;
}

export const filterByToday = (data: Clientes[]) => {
  const hoursRanges = [
    { label: '00:00', start: 0, end: 1 },
    { label: '00:01', start: 1, end: 2 },
    { label: '00:02', start: 2, end: 3 },
    { label: '00:03', start: 3, end: 4 },
    { label: '00:04', start: 4, end: 5 },
    { label: '00:05', start: 5, end: 6 },
    { label: '00:06', start: 6, end: 7 },
    { label: '00:07', start: 7, end: 8 },
    { label: '00:08', start: 8, end: 9 },
    { label: '00:09', start: 9, end: 10 },
    { label: '00:10', start: 10, end: 11 },
    { label: '00:11', start: 11, end: 12 },
    { label: '00:12', start: 12, end: 13 },
    { label: '00:13', start: 13, end: 14 },
    { label: '00:14', start: 14, end: 15 },
    { label: '00:15', start: 15, end: 16 },
    { label: '00:16', start: 16, end: 17 },
    { label: '00:17', start: 17, end: 18 },
    { label: '00:18', start: 18, end: 19 },
    { label: '00:19', start: 19, end: 20 },
    { label: '00:20', start: 20, end: 21 },
    { label: '00:21', start: 21, end: 22 },
    { label: '00:22', start: 22, end: 23 },
    { label: '00:23', start: 23, end: 24 },
  ];

  const todayData = data.filter((item) => {
    const date = parseISO(item.fecha);
    return isToday(date);
  });

  const result = {
    labels: hoursRanges.map((range) => range.label),
    values: hoursRanges.map((_, idx) => ({
      fecha: '',
      id: randomUUID(),
      clientesTotales: 0,
      clientesNuevos: 0,
      compraron: 0,
      noCompraron: 0,
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
      values.clientesTotales += item.clientesTotales;
      values.clientesNuevos += item.clientesNuevos;
      values.compraron += item.compraron;
      values.noCompraron += item.noCompraron;
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

export const filterByToday7Ranges = (data: Clientes[]) => {
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
    values: hoursRanges.map((_, idx) => ({
      fecha: '',
      id: randomUUID(),
      clientesTotales: 0,
      clientesNuevos: 0,
      compraron: 0,
      noCompraron: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
    })),
  };

  todayData.forEach((item, idx) => {
    const date = parseISO(item.fecha);
    const hour = date.getHours();

    const rangeIndex = hoursRanges.findIndex(
      (range) => hour >= range.start && hour < range.end
    );

    if (rangeIndex !== -1) {
      const values = result.values[rangeIndex];
      values.fecha = format(item.fecha, 'EEE, d MMM HH:mm', { locale: es });
      values.id = randomUUID();
      values.clientesTotales += item.clientesTotales;
      values.clientesNuevos += item.clientesNuevos;
      values.compraron += item.compraron;
      values.noCompraron += item.noCompraron;
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

export type DayFilter =
  | 'Todo'
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

export const filterByLastSevenDays = (
  data: Clientes[],
  dayFilter: DayFilter = 'Todo'
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
    values: filteredDays.map((_, idx) => ({
      fecha: '',
      id: randomUUID(),
      clientesTotales: 0,
      clientesNuevos: 0,
      compraron: 0,
      noCompraron: 0,
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
      values.fecha = format(itemDate, 'EEE, d MMM HH:mm', { locale: es });
      values.id = randomUUID();
      values.clientesTotales += item.clientesTotales;
      values.clientesNuevos += item.clientesNuevos;
      values.compraron += item.compraron;
      values.noCompraron += item.noCompraron;
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

export const filterByCurrentMonth = (data: Clientes[]) => {
  const today = new Date();

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const result = {
    labels: daysInMonth.map((day) => getDate(day).toString()),
    values: daysInMonth.map((_, idx) => ({
      id: randomUUID(),
      fecha: '',
      clientesTotales: 0,
      clientesNuevos: 0,
      compraron: 0,
      noCompraron: 0,
      dineroTotal: 0,
      ventas: 0,
      devoluciones: 0,
      cashbackAcumulado: 0,
      cashbackGenerado: 0,
      cashbackTotal: 0,
    })),
  };

  data.forEach((item, idx) => {
    const itemDate = parseISO(item.fecha);

    if (isWithinInterval(itemDate, { start: monthStart, end: monthEnd })) {
      const dayOfMonth = getDate(itemDate);

      const dayIndex = dayOfMonth - 1;

      const values = result.values[dayIndex];
      values.id = randomUUID();
      values.fecha = format(item.fecha, 'EEE, d MMM HH:mm', { locale: es });
      values.clientesTotales += item.clientesTotales;
      values.clientesNuevos += item.clientesNuevos;
      values.compraron += item.compraron;
      values.noCompraron += item.noCompraron;
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
  data: Clientes[],
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
    values: filteredMonths.map((_, idx) => ({
      id: randomUUID(),
      fecha: '',
      clientesTotales: 0,
      clientesNuevos: 0,
      compraron: 0,
      noCompraron: 0,
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
      values.clientesTotales += item.clientesTotales;
      values.clientesNuevos += item.clientesNuevos;
      values.compraron += item.compraron;
      values.noCompraron += item.noCompraron;
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
  data: Clientes[],
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
      clientesTotales: 0,
      clientesNuevos: 0,
      compraron: 0,
      noCompraron: 0,
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
        values.clientesTotales += item.clientesTotales;
        values.clientesNuevos += item.clientesNuevos;
        values.compraron += item.compraron;
        values.noCompraron += item.noCompraron;
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
