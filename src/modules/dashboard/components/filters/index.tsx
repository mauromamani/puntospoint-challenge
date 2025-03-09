import { useTheme } from '@mui/material';
import { DesktopFilters } from './desktop-filter';
import { useMediaQuery } from '@mui/material';
import { MobileFilters } from './mobile-filter';

export const Filters = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

  return isSmallScreen ? <MobileFilters /> : <DesktopFilters />;
};
