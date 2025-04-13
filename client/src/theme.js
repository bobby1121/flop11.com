import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Red
      light: '#ff3333',
      dark: '#cc0000',
    },
    secondary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ff0000',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#ff0000',
    },
    h2: {
      color: '#ff0000',
    },
    h3: {
      color: '#ff0000',
    },
    h4: {
      color: '#ff0000',
    },
    h5: {
      color: '#ff0000',
    },
    h6: {
      color: '#ff0000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #ff0000',
        },
      },
    },
  },
});

export default theme; 