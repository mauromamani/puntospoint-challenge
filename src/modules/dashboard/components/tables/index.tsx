import { Box, Stack } from '@mui/material';
import { useChartStore } from '../../store/chart.store';
import { ClientesTables } from './clientes-tables';
import { TransaccionesTables } from './transacciones-tables';
import { useFilterStore } from '../../store/filter.store';
import { useSidebarStore } from '../../store/sidebar.store';
import { PulsoTables } from './pulso-tables';
import { Button } from '@/shared/components/ui';
import DownloadIcon from '@mui/icons-material/Download';
import { pushEventAnalytics } from '../../../../core/ga4/util';

export const Tables = () => {
  const { selectedTypeChart } = useSidebarStore();
  const { selectedGraficoFilter } = useFilterStore();
  const { selectedBarChart } = useChartStore();

  if (
    selectedGraficoFilter === 'YTD/YTG' ||
    selectedGraficoFilter === 'MAX' ||
    selectedGraficoFilter === 'Personalizado'
  ) {
    return null;
  }

  return (
    <Box component='section' mt='10px'>
      <Stack direction='row' justifyContent='end' mb='20px'>
        <Button
          variant='text'
          startIcon={<DownloadIcon />}
          onClick={() => {
            pushEventAnalytics({
              action: 'export-table',
              description: 'Exported table',
            });
          }}
        >
          Exportar tabla
        </Button>
      </Stack>

      <Box
        sx={{
          overflowY: 'hidden',
          overflowX: 'auto',
        }}
      >
        {selectedTypeChart === 'Grafico' ? (
          <>
            {selectedBarChart === 'Clientes' && <ClientesTables />}

            {selectedBarChart === 'Transacciones' && <TransaccionesTables />}
          </>
        ) : (
          <>
            <PulsoTables />
          </>
        )}
      </Box>
    </Box>
  );
};
