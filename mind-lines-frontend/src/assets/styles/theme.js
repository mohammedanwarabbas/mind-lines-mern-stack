import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f57c00',         // Rich orange (main theme color)
      light: '#ffb74d',        // Light orange for hovers and highlights
      dark: '#e65100',         // Darker shade for depth or active states
      contrastText: '#ffffff'  // White text for buttons or elements on orange
    },
    secondary: {
      main: '#000000',       // Pure black
      light: '#333333',      // Dark gray for lighter elements
      dark: '#000000',       // Same as main if you want solid black
      contrastText: '#ffffff', // White text on black backgrounds
    },
    textPrimary: {
      main: '#000000', // Default text color
    },
    textSecondary: {
      main: '#ffffff', // Default secondary text color
    },
    background: {
      default: '#f5f5f5', // Default background color
      paper: '#ffffff', // Default paper background color
    },
  },
  typography: {
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Example font
    h1: {
      // fontSize: '2.5rem',
      // fontWeight: 500,
    },
    // ... other typography settings
  },
  // ... other theme customizations (spacing, breakpoints, etc.)
});

export default theme;
