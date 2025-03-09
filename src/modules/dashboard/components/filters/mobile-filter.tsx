import { Box, Menu, MenuItem, Stack } from '@mui/material';
import { Button } from '@/shared/components/ui';

import { graficoFilterList, pulsoFilterList } from '../../utils/table-filters';
import { GraficoFilter, useFilterStore } from '../../store/filter.store';
import { useMemo, useState } from 'react';
import { useSidebarStore } from '../../store/sidebar.store';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ListIcon from '@mui/icons-material/List';
import { ChangeChartButtons } from '../sidebar/change-chart-buttons';
import { pushEventAnalytics } from '../../../../core/ga4/util';

export const MobileFilters = () => {
  const { selectedTypeChart } = useSidebarStore();
  const {
    selectedGraficoFilter,
    selectedGraficoSubFilter,
    setSelectedGraficoFilter,
    setSelectedGraficoSubFilter,
  } = useFilterStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElSub, setAnchorElSub] = useState<null | HTMLElement>(null);
  const openSub = Boolean(anchorElSub);
  const handleClickSub = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSub(event.currentTarget);
  };
  const handleCloseSub = () => {
    setAnchorElSub(null);
  };

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
    <Stack
      component='nav'
      marginBottom='30px'
      justifyContent='space-between'
      alignItems='center'
      direction='row'
    >
      <ChangeChartButtons />

      <Stack direction='row' spacing={2}>
        <Button
          id='filter'
          variant='text'
          onClick={handleClick}
          sx={{ borderRadius: '5px', px: '10px', py: '4px' }}
          startIcon={<FilterAltIcon />}
        >
          {selectedGraficoFilter}
        </Button>

        <Menu id='filter' anchorEl={anchorEl} open={open} onClose={handleClose}>
          {filterList.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                onChangeFilter(item.label as GraficoFilter);
                handleClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        {filterList?.find((item) => item.label === selectedGraficoFilter)
          ?.subItems.length ? (
          <>
            <Button
              id='subfilter'
              onClick={handleClickSub}
              sx={{ borderRadius: '5px', px: '10px', py: '4px' }}
              startIcon={<ListIcon />}
            >
              {selectedGraficoSubFilter}
            </Button>
            <Menu
              id='subfilter'
              anchorEl={anchorElSub}
              open={openSub}
              onClose={handleCloseSub}
            >
              {filterList
                .find((item) => item.label === selectedGraficoFilter)
                ?.subItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      onChangeSubFilter(item.label as GraficoFilter);
                      handleCloseSub();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
            </Menu>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};
