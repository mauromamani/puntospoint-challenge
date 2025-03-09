import { useGetInfoCards } from '../../services/queries';
import { Card } from './card';
import { motion } from 'framer-motion';
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import { ChangeChartButtons } from './change-chart-buttons';

export const Sidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const [isStacked, setIsStacked] = useState<boolean>(false);
  const getInfoCards = useGetInfoCards();

  return (
    <Box component='aside' width={{ xl: '323px', md: '100%' }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        {!isSmallScreen && <ChangeChartButtons />}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => setIsStacked(!isStacked)}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '2rem',
                color: '#000000',
              },
            }}
          >
            {isStacked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Stack>

      <motion.div
        layout
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        {getInfoCards?.data?.map((item, index) => (
          <Card key={item.mes} {...item} isStacked={isStacked} index={index} />
        ))}
      </motion.div>
    </Box>
  );
};
