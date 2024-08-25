import { createTheme } from '@react-native-material/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F3E5F5',
    },
  },
});

export default theme;