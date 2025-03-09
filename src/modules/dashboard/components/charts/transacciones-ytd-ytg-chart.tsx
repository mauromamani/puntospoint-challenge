import {
  BarPlot,
  ChartsGrid,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  HighlightItemData,
  PopperProps,
  ResponsiveChartContainer,
} from '@mui/x-charts';
import { useGetTransaccionesYTDYTGData } from '../../services/queries';
import { Box, Popper, Stack, styled, Typography } from '@mui/material';
import { formatCurrency, formatNumber } from '../../utils/numeral';
import { useEffect, useState } from 'react';
import { ytdYtgChart, ytdYtgLegends } from '../../utils/charts';
import { useChartStore } from '../../store/chart.store';

export const TransaccionesYTDYTGChart = () => {
  const { selectedAllFilter } = useChartStore();
  const [selectedChartItem, setSelectedChartItem] = useState<
    (HighlightItemData & { datasetIndex: number }) | null
  >(null);
  const [selectedLegends] = useState(ytdYtgLegends);
  const getTransaccionesYTDYTGData =
    useGetTransaccionesYTDYTGData(selectedAllFilter);

  useEffect(() => {
    getTransaccionesYTDYTGData.refetch();
  }, [selectedAllFilter]);

  if (getTransaccionesYTDYTGData.isLoading) {
    return <div>Loading...</div>;
  }

  if (getTransaccionesYTDYTGData.isError) {
    return <div>Error...</div>;
  }

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
      getTransaccionesYTDYTGData?.data?.[selectedChartItem?.datasetIndex]
        ?.values[selectedChartItem?.dataIndex!];

    switch (selectedChartItem?.seriesId) {
      case 'current':
        data.value = `${item?.type} $${formatNumber(item?.current!)}`;
        break;
      case 'previous':
        data.value = `${item?.type} $${formatNumber(item?.previous!)}`;
        break;
    }

    return data;
  };

  return (
    <Stack direction='row'>
      <Box width='50%'>
        <ResponsiveChartContainer
          dataset={getTransaccionesYTDYTGData?.data?.[0]?.values || []}
          series={ytdYtgChart}
          xAxis={[{ scaleType: 'band', dataKey: 'type' }]}
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
            setSelectedChartItem({
              ...highlight,
              datasetIndex: 0,
            });
          }}
        >
          <ChartsGrid horizontal />
          <ChartsTooltip
            trigger={'item'}
            slots={{
              popper: (props) => <CustomPopperRoot {...props} />,
            }}
          />

          <ChartsXAxis disableLine disableTicks />

          <ChartsYAxis
            position='left'
            disableLine
            disableTicks
            axisId='y-axis-id'
            valueFormatter={(value: number) => formatCurrency(value)}
          />

          <BarPlot />
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
            >
              <Box width='15px' height='15px' bgcolor={item.fill} />
              <Typography component='p' fontSize='12px' color='#48454e'>
                {item?.label?.toString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box width='50%'>
        <ResponsiveChartContainer
          dataset={getTransaccionesYTDYTGData?.data?.[1]?.values || []}
          series={ytdYtgChart}
          xAxis={[{ scaleType: 'band', dataKey: 'type' }]}
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
            setSelectedChartItem({
              ...highlight,
              datasetIndex: 1,
            });
          }}
        >
          <ChartsGrid horizontal />
          <ChartsTooltip
            trigger={'item'}
            slots={{
              popper: (props) => <CustomPopperRoot {...props} />,
            }}
          />

          <ChartsXAxis disableLine disableTicks />

          <ChartsYAxis
            position='left'
            disableLine
            disableTicks
            axisId='y-axis-id'
            valueFormatter={(value: number) => formatCurrency(value)}
          />

          <BarPlot />
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
            >
              <Box width='15px' height='15px' bgcolor={item.fill} />
              <Typography component='p' fontSize='12px' color='#48454e'>
                {item?.label?.toString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};
