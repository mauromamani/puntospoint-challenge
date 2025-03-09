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
import { useEffect, useMemo, useState } from 'react';
import {
  cashbackLegends,
  clientesLegends,
  dineroLegends,
  pulsoChart,
  pulsoLegends,
  pulsoLinesChart,
  pulsoLinesLegends,
  Serie,
} from '../../utils/charts';
import { useGetPulsoData } from '../../services/queries';
import { useFilterStore } from '../../store/filter.store';
import { formatCurrency, formatNumber } from '../../utils/numeral';

export const PulsoChart = () => {
  const [selectedChartItem, setSelectedChartItem] =
    useState<HighlightItemData | null>(null);

  const { selectedGraficoFilter, selectedGraficoSubFilter } = useFilterStore();

  const getPulsoData = useGetPulsoData(
    selectedGraficoFilter,
    selectedGraficoSubFilter
  );

  const [selectedLegends, setSelectedLegends] = useState(pulsoLegends);
  const [selectedLineLegends, setSelectedLineLegends] =
    useState(pulsoLinesLegends);

  // Agregar o quitar charts de los legends seleccionados
  const onChangeSelectedLegends = (
    dataKey: string,
    isLine: boolean = false
  ) => {
    // Si es un line chart
    if (isLine) {
      setSelectedLineLegends((prev) =>
        prev.map((item) =>
          item.dataKey === dataKey
            ? { ...item, selected: !item.selected }
            : item
        )
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

  // series:
  const series = useMemo(() => {
    let series: Serie[] = [...pulsoChart];

    // Filtrar las series seleccionadas en el legend
    series = series.filter((item) => {
      const legend = selectedLegends.find(
        (legend) => 'dataKey' in item && legend.dataKey === item.dataKey
      );

      return legend?.selected;
    });

    series.push(...pulsoLinesChart);

    return series;
  }, [selectedLegends]);

  useEffect(() => {
    getPulsoData.refetch();
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

    const item = getPulsoData?.data?.values[selectedChartItem?.dataIndex!];

    data.date = item?.fecha!;

    switch (selectedChartItem?.seriesId) {
      case 'diaUno':
        data.value = formatCurrency(item?.diaUno!);
        break;
      case 'diaDiez':
        data.value = formatCurrency(item?.diaDiez!);
        break;
      case 'diaVeinte':
        data.value = formatCurrency(item?.diaVeinte!);
        break;
      case 'cashAcumulado':
        data.value = formatCurrency(item?.cashAcumulado!);
        break;
    }

    return data;
  };

  return (
    <>
      <ResponsiveChartContainer
        dataset={
          getPulsoData?.isPending || getPulsoData?.isError
            ? []
            : getPulsoData?.data?.values
        }
        series={series}
        xAxis={[
          {
            data:
              getPulsoData?.isPending || getPulsoData?.isError
                ? []
                : getPulsoData?.data?.labels?.map((item) => item.toString()),
            scaleType: 'band',
            id: 'x-axis-id',
          },
        ]}
        yAxis={[
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
          axisId='y-axis-right'
          valueFormatter={(value: number) => formatCurrency(value)}
        />
      </ResponsiveChartContainer>

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
    </>
  );
};
