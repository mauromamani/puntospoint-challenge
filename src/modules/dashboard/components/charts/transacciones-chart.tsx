import { Box, Popper, styled, Typography } from '@mui/material';
import {
  BarPlot,
  ChartsGrid,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  HighlightItemData,
  LinePlot,
  MarkPlot,
  PopperProps,
  ResponsiveChartContainer,
} from '@mui/x-charts';
import { useChartStore } from '../../store/chart.store';
import { useEffect, useMemo, useState } from 'react';
import {
  cashbackChart,
  cashbackLegends,
  dineroChart,
  dineroLegends,
  Serie,
  transaccionesChart,
  transaccionesLegends,
} from '../../utils/charts';
import { useFilterStore } from '../../store/filter.store';
import { useGetTransaccionesData } from '../../services/queries';
import { formatCurrency, formatNumber } from '../../utils/numeral';

export const TransaccionesChart = () => {
  const [selectedChartItem, setSelectedChartItem] =
    useState<HighlightItemData | null>(null);
  const { selectedGraficoFilter, selectedGraficoSubFilter } = useFilterStore();
  const { selectedLineChart } = useChartStore();

  const getTransaccionesData = useGetTransaccionesData(
    selectedGraficoFilter,
    selectedGraficoSubFilter
  );

  const [selectedLegends, setSelectedLegends] = useState(transaccionesLegends);
  const [selectedLineLegends, setSelectedLineLegends] = useState<
    typeof dineroLegends | typeof cashbackLegends
  >([]);

  // Agregar o quitar charts de los legends seleccionados
  const onChangeSelectedLegends = (
    dataKey: string,
    isLine: boolean = false
  ) => {
    // Si es un line chart
    if (isLine) {
      setSelectedLineLegends(
        (prev) =>
          prev.map((item) =>
            item.dataKey === dataKey
              ? { ...item, selected: !item.selected }
              : item
          ) as typeof dineroLegends | typeof cashbackLegends
      );

      return;
    }

    // Si es un bar chart
    setSelectedLegends((prev) =>
      prev.map((item) =>
        item.dataKey === dataKey ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const series = useMemo(() => {
    let series: Serie[] = [...transaccionesChart];

    // Filtrar las series seleccionadas en el legend
    series = series.filter((item) => {
      const legend = selectedLegends.find(
        (legend) => 'dataKey' in item && legend.dataKey === item.dataKey
      );

      return legend?.selected;
    });

    // Agregar las series seleccionadas en el line chart
    if (selectedLineChart === 'Dinero') {
      const dinero = dineroChart.filter((item) => {
        const legend = selectedLineLegends.find(
          (legend) => 'dataKey' in item && legend.dataKey === item.dataKey
        );

        return legend?.selected;
      });

      series.push(...dinero);
    }

    if (selectedLineChart === 'Cashback') {
      const cashback = cashbackChart.filter((item) => {
        const legend = selectedLineLegends.find(
          (legend) => 'dataKey' in item && legend.dataKey === item.dataKey
        );

        return legend?.selected;
      });

      series.push(...cashback);
    }

    return series;
  }, [selectedLineChart, selectedLegends, selectedLineLegends]);

  useEffect(() => {
    setSelectedLineLegends(
      selectedLineChart === 'Dinero' ? dineroLegends : cashbackLegends
    );
  }, [selectedLineChart]);

  useEffect(() => {
    getTransaccionesData.refetch();
  }, [selectedGraficoFilter, selectedGraficoSubFilter]);

  const ChartsTooltipRoot = styled(Popper, {
    name: 'MuiChartsTooltip',
    slot: 'Root',
    overridesResolver: (_, styles) => styles.root,
  })(({ theme }) => ({
    pointerEvents: 'none',
    zIndex: theme.zIndex.modal,
  }));

  const CustomPopperRoot = (props: PopperProps) => {
    const data = returnDataChart();

    if (!data) return null;

    return (
      <ChartsTooltipRoot {...props} placement='top-start'>
        <Box borderRadius='4px' px='8px' py='4px' bgcolor='#555555'>
          <Typography component='p' fontSize='12px' color='#F4EFF4'>
            {data?.value}
          </Typography>

          <Typography component='p' fontSize='12px' color='#F4EFF4'>
            {data?.date}
          </Typography>
        </Box>
      </ChartsTooltipRoot>
    );
  };

  const returnDataChart = () => {
    if (
      selectedChartItem?.dataIndex === undefined ||
      !selectedChartItem?.seriesId
    ) {
      return null;
    }

    const data = {
      value: '',
      date: '',
    };

    const item =
      getTransaccionesData?.data?.values[selectedChartItem?.dataIndex!];

    data.date = item?.fecha!;

    switch (selectedChartItem?.seriesId) {
      case 'transacciones':
        data.value = formatNumber(item?.transacciones!);
        break;
      case 'dineroTotal':
        data.value = formatCurrency(item?.dineroTotal!);
        break;
      case 'devoluciones':
        data.value = formatCurrency(item?.devoluciones!);
        break;
      case 'ventas':
        data.value = formatCurrency(item?.ventas!);
        break;
      case 'cashbackAcumulado':
        data.value = formatNumber(item?.cashbackAcumulado!);
        break;
      case 'cashbackGenerado':
        data.value = formatNumber(item?.cashbackGenerado!);
      case 'ventas':
        data.value = formatCurrency(item?.ventas!);
        break;
    }

    return data;
  };

  if (selectedGraficoFilter === 'YTD/YTG') {
    return null;
  }

  return (
    <>
      <ResponsiveChartContainer
        dataset={
          getTransaccionesData?.isPending || getTransaccionesData?.isError
            ? []
            : getTransaccionesData?.data?.values
        }
        series={series}
        xAxis={[
          {
            data:
              getTransaccionesData?.isPending || getTransaccionesData?.isError
                ? []
                : getTransaccionesData?.data?.labels?.map((item) =>
                    item.toString()
                  ),
            scaleType: 'band',
            id: 'x-axis-id',
          },
        ]}
        yAxis={[
          {
            scaleType: 'linear',
            id: 'y-axis-id',
          },
          {
            scaleType: 'linear',
            id: 'y-axis-right',
          },
        ]}
        height={400}
        onHighlightChange={(highlight) => {
          if (!highlight) return;
          setSelectedChartItem(highlight);
        }}
      >
        <ChartsGrid horizontal />
        <ChartsTooltip
          trigger={'item'}
          slots={{
            popper: (props) => <CustomPopperRoot {...props} />,
          }}
        />

        <BarPlot />
        <LinePlot />
        <MarkPlot />

        <ChartsXAxis position='bottom' disableLine axisId='x-axis-id' />
        <ChartsYAxis
          position='left'
          disableLine
          disableTicks
          axisId='y-axis-id'
          valueFormatter={(value: number) => formatNumber(value)}
        />

        <ChartsYAxis
          position='right'
          disableLine
          disableTicks
          axisId='y-axis-right'
          valueFormatter={(value: number) => formatCurrency(value)}
        />
      </ResponsiveChartContainer>

      {/* Cliente legends */}
      <Box
        display='flex'
        gap='20px'
        alignItems='center'
        justifyContent='center'
      >
        {selectedLegends.map((item) => (
          <Box
            key={item.dataKey}
            display='flex'
            alignItems='center'
            gap='5px'
            borderRadius='0.5px'
            onClick={() => onChangeSelectedLegends(item.dataKey!)}
            sx={{
              cursor: 'pointer',
              opacity: item.selected ? 1 : 0.5,
            }}
          >
            <Box width='15px' height='15px' bgcolor={item.fill} />
            <Typography component='p' fontSize='12px' color='#48454e'>
              {item?.label?.toString()}
            </Typography>
          </Box>
        ))}
      </Box>

      {selectedLineChart && (
        <Box
          display='flex'
          gap='20px'
          alignItems='center'
          justifyContent='center'
          mt='10px'
        >
          {selectedLineLegends.map((item) => (
            <Box
              key={item.dataKey}
              display='flex'
              alignItems='center'
              gap='5px'
              onClick={() => onChangeSelectedLegends(item.dataKey!, true)}
              sx={{
                cursor: 'pointer',
                opacity: item.selected ? 1 : 0.5,
              }}
            >
              <Box
                width='15px'
                height='3px'
                bgcolor={item.fill}
                borderRadius='50px'
              />
              <Typography component='p' fontSize='12px' color='#48454e'>
                {item?.label?.toString()}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
