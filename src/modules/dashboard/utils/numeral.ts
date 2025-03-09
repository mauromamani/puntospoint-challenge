export const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    const millones = value / 1000000;
    return `$${millones.toFixed(1).replace(/\.0$/, '')}M`;
  } else {
    return formatThousands(value);
  }
};

export const formatThousands = (value: number) => {
  const formated = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace('US$', '');

  return `$${formated}`;
};

export const formatNumber = (value: number) => {
  const formated = new Intl.NumberFormat('es', {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(value);

  return formated;
};
