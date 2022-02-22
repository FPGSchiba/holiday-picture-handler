import { createTheme } from '@mui/material';
import variables from './variables.module.scss';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 540,
      sm: 860,
      md: 1280,
      lg: 1600,
      xl: 1980,
    },
  },
  palette: {
    primary: {
      main: variables.primaryColor,
    },
    secondary: {
      main: variables.primaryColor2,
    },
    error: {
      main: variables.errorColor,
    },
    success: {
      main: variables.infoColor,
    },
  },
  typography: {
    fontFamily: variables.fontFamily,
    body2: {
      fontFamily: variables.fontFamily,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 2,
  },
});

export default theme;
