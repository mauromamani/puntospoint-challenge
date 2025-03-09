import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 100,
          fontWeight: 500,
          fontSize: 14,
          padding: '10px 24px',
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          boxShadow: 'none',
          width: 'fit-content',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          borderBottom: 'none',
          padding: '5px 2px',
          fontSize: '16px',
          fontWeight: 400,
          color: '#000',
          height: '48px',
          width: '120px',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '12px',
          fontWeight: 400,
          backgroundColor: '#313033',
          color: '#F4EFF4',
          borderRadius: '4px',
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
