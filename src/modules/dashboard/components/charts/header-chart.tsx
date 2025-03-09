import { Button, OutlinedChip } from '@/shared/components/ui';
import { Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { BarChart, LineChart, useChartStore } from '../../store/chart.store';
import React from 'react';

const barChartItems: { label: BarChart }[] = [
  { label: 'Clientes' },
  { label: 'Transacciones' },
];

const lineChartItems: { label: LineChart }[] = [
  { label: 'Dinero' },
  { label: 'Cashback' },
];

interface HeaderChartProps {
  allowAllFilters?: boolean;
}

export const HeaderChart: React.FC<HeaderChartProps> = ({
  allowAllFilters = false,
}) => {
  const {
    selectedBarChart,
    selectedLineChart,
    selectedAllFilter,
    setSelectedBarChart,
    setSelectedLineChart,
    setSelectedAllFilter,
  } = useChartStore();

  // onChangeBarChart:
  const onChangeBarChart = (chart: BarChart) => {
    setSelectedBarChart(chart);
    setSelectedLineChart('');
  };

  // onChangeLineChart:
  const onChangeLineChart = (chart: LineChart) => {
    if (chart === selectedLineChart) {
      setSelectedLineChart('');
      return;
    }

    setSelectedLineChart(chart);
  };

  const onChangeAllFilter = (filter: BarChart | LineChart) => {
    setSelectedAllFilter(filter);
  };

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: {
          xs: '10px',
          xl: '0px',
        },
        justifyContent: {
          md: 'start',
          xl: 'space-between',
        },
      }}
    >
      <Stack direction='row' spacing='15px'>
        {barChartItems.map((item) => {
          let isSelected = true;

          if (allowAllFilters) {
            isSelected = item.label === selectedAllFilter;
          } else {
            isSelected = item.label === selectedBarChart;
          }

          return (
            <OutlinedChip
              key={item.label}
              label={item.label}
              clickable
              selected={isSelected}
              onClick={() => {
                if (allowAllFilters) {
                  onChangeAllFilter(item.label);
                  return;
                }
                onChangeBarChart(item.label);
              }}
              sx={{
                border: isSelected ? 'none' : '1px solid #79757F',
              }}
              icon={
                isSelected ? (
                  <CheckIcon
                    sx={{
                      width: '15px !important',
                      color: '#1D192B !important',
                    }}
                  />
                ) : undefined
              }
            />
          );
        })}
      </Stack>

      <Stack direction='row' spacing='15px'>
        {lineChartItems.map((item) => {
          let isSelected = true;

          if (allowAllFilters) {
            isSelected = item.label === selectedAllFilter;
          } else {
            isSelected = item.label === selectedLineChart;
          }

          return (
            <OutlinedChip
              key={item.label}
              label={item.label}
              clickable
              selected={isSelected}
              onClick={() => {
                if (allowAllFilters) {
                  onChangeAllFilter(item.label);
                  return;
                }
                onChangeLineChart(item.label);
              }}
              sx={{
                border: isSelected ? 'none' : '1px solid #79757F',
              }}
              icon={
                isSelected ? (
                  <CheckIcon
                    sx={{
                      width: '15px !important',
                      color: '#1D192B !important',
                    }}
                  />
                ) : undefined
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
