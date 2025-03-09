import { Box } from '@mui/material';
import { ClientesChart } from './clientes-chart';
import { HeaderChart } from './header-chart';
import { useChartStore } from '../../store/chart.store';
import { TransaccionesChart } from './transacciones-chart';
import { useSidebarStore } from '../../store/sidebar.store';
import { PulsoChart } from './pulso-chart';
import { useFilterStore } from '../../store/filter.store';
import { TransaccionesYTDYTGChart } from './transacciones-ytd-ytg-chart';

export const Charts = () => {
  const { selectedTypeChart } = useSidebarStore();
  const { selectedGraficoFilter } = useFilterStore();
  const { selectedBarChart } = useChartStore();

  if (selectedGraficoFilter === 'YTD/YTG') {
    return (
      <>
        <HeaderChart allowAllFilters />
        <TransaccionesYTDYTGChart />
      </>
    );
  }

  return (
    <Box>
      {selectedTypeChart === 'Grafico' ? (
        <>
          <HeaderChart />
          {selectedBarChart === 'Clientes' && <ClientesChart />}
          {selectedBarChart === 'Transacciones' && <TransaccionesChart />}
        </>
      ) : (
        <PulsoChart />
      )}
    </Box>
  );
};
