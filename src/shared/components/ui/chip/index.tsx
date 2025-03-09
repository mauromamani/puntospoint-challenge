import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ChipProps {
  selected?: boolean;
}

export const OutlinedChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<ChipProps>(({ selected, variant }) => ({
  height: '32px',
  borderRadius: '8px',
  backgroundColor: selected ? '#e7dff7' : 'transparent',
  color: selected ? '#1D192B' : '#48454e',
  fontSize: '14px',
  fontWeight: 500,

  '&:hover': {
    backgroundColor: selected ? '#d7cfe7' : '#efeaef',
  },

  '&:focus': {
    backgroundColor: selected ? '#cfc7df' : '#e8e3e8',
  },

  '&.MuiChip-icon': {
    color: '#634bb8',
    width: '19px',
  },
}));
