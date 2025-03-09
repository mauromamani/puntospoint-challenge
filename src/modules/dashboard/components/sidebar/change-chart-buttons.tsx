import { Box } from '@mui/material';
import { Button } from '@/shared/components/ui';
import BarChartIcon from '@mui/icons-material/BarChart';
import { PulsoStarIcon } from '@/shared/components/icons';
import { useSidebarStore } from '../../store/sidebar.store';
import { pushEventAnalytics } from 'src/core/ga4/util';

export const ChangeChartButtons = () => {
  const { setSelectedTypeChart, selectedTypeChart } = useSidebarStore();

  return (
    <Box
      border='2px solid #634bb9'
      p='4px'
      width='fit-content'
      display='flex'
      borderRadius='100px'
      alignItems='center'
      justifyContent='center'
      gap='5px'
    >
      <Button
        variant={selectedTypeChart === 'Grafico' ? 'contained' : 'text'}
        sx={{ py: '0px', px: '15px', height: '38px' }}
        startIcon={
          <BarChartIcon
            sx={{
              color: selectedTypeChart === 'Grafico' ? '#fff' : '#634bb9',
            }}
          />
        }
        onClick={() => {
          pushEventAnalytics({
            action: 'type-chart',
            description: 'Changed to Gráfico',
          });
          setSelectedTypeChart('Grafico');
        }}
      >
        Gráfico
      </Button>

      <Button
        variant={selectedTypeChart === 'Pulso' ? 'contained' : 'text'}
        sx={{ py: '0px', px: '15px', height: '38px' }}
        onClick={() => {
          pushEventAnalytics({
            action: 'type-chart',
            description: 'Changed to Pulso',
          });
          setSelectedTypeChart('Pulso');
        }}
        startIcon={
          <PulsoStarIcon
            fill={selectedTypeChart === 'Pulso' ? '#fff' : '#634bb9'}
          />
        }
      >
        Pulso
      </Button>
    </Box>
  );
};
