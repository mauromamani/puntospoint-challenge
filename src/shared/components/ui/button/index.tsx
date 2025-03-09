import { Button as ButtonMUI } from '@mui/material';
import { styled } from '@mui/material/styles';

const colors = {
  primary: '#634cb8',
  primaryHover: '#7059c1',
  primaryActive: '#7761c3',
  border: '#77747d',
  disabled: '#e2dde2',
  disabledText: '#969499',
  hoverBackground: '#e7e1ed',
  focusBackground: '#eae3f3',
} as const;

export const Button = styled(ButtonMUI)(() => ({
  '&.MuiButton-contained': {
    backgroundColor: colors.primary,
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: colors.primaryHover,
      boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
    },
    '&:focus': {
      backgroundColor: colors.primaryActive,
    },
    '&:active': {
      backgroundColor: colors.primaryActive,
    },
    '&.Mui-disabled': {
      backgroundColor: colors.disabled,
      color: colors.disabledText,
    },
  },
  '&.MuiButton-outlined': {
    borderColor: colors.border,
    color: colors.primary,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: colors.hoverBackground,
    },
    '&:focus': {
      backgroundColor: colors.focusBackground,
      borderColor: colors.border,
    },
    '&:active': {
      backgroundColor: colors.focusBackground,
      borderColor: colors.border,
    },
    '&.Mui-disabled': {
      borderColor: colors.disabled,
      color: colors.disabledText,
    },
  },
  '&.MuiButton-text': {
    color: colors.primary,
    '&:hover': {
      backgroundColor: colors.hoverBackground,
    },
    '&:focus': {
      backgroundColor: colors.focusBackground,
    },
    '&:active': {
      backgroundColor: colors.focusBackground,
    },
    '&.Mui-disabled': {
      color: colors.disabledText,
    },
  },
}));
