import { Box, Stack } from '@mui/material';
import { OutlinedChip, Button } from '@/shared/components/ui';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { graficoFilterList, pulsoFilterList } from '../../utils/table-filters';
import { GraficoFilter, useFilterStore } from '../../store/filter.store';
import { useMemo } from 'react';
import { useSidebarStore } from '../../store/sidebar.store';
import { pushEventAnalytics } from 'src/core/ga4/util';

export const DesktopFilters = () => {
  const { selectedTypeChart } = useSidebarStore();
  const {
    selectedGraficoFilter,
    selectedGraficoSubFilter,
    setSelectedGraficoFilter,
    setSelectedGraficoSubFilter,
  } = useFilterStore();
  const onChangeFilter = (label: GraficoFilter) => {
    setSelectedGraficoFilter(label);
    setSelectedGraficoSubFilter('Todo');

    pushEventAnalytics({ action: 'filter', description: label });
  };

  const onChangeSubFilter = (label: string) => {
    setSelectedGraficoSubFilter(label);
    pushEventAnalytics({ action: 'sub-filter', description: label });
  };

  const filterList = useMemo(() => {
    if (selectedTypeChart === 'Grafico') {
      setSelectedGraficoFilter('HOY');
      return graficoFilterList;
    }

    setSelectedGraficoFilter('PULSO');
    return pulsoFilterList;
  }, [selectedTypeChart]);

  return (
    <Box component='nav' marginBottom='40px'>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        marginTop='10px'
      >
        <Stack direction='row' spacing='10px'>
          {filterList.map((item) => (
            <OutlinedChip
              key={item.label}
              label={item.label}
              clickable
              selected={item.label === selectedGraficoFilter}
              onClick={() => onChangeFilter(item.label as GraficoFilter)}
              icon={item.icon ? <item.icon /> : undefined}
            />
          ))}
        </Stack>

        {selectedTypeChart === 'Grafico' && (
          <Button
            variant='text'
            sx={{ paddingX: '10px', paddingY: '5px' }}
            startIcon={<RemoveRedEyeIcon sx={{ width: '20px' }} />}
          >
            Ver detalle
          </Button>
        )}
      </Stack>

      <Stack
        direction='row'
        spacing='10px'
        marginTop='20px'
        marginBottom='20px'
      >
        {filterList
          .find((item) => item.label === selectedGraficoFilter)
          ?.subItems.map((item) => (
            <OutlinedChip
              key={item.label}
              label={item.label}
              clickable
              selected={item.label === selectedGraficoSubFilter}
              onClick={() => onChangeSubFilter(item.label)}
            />
          ))}
      </Stack>
    </Box>
  );
};
