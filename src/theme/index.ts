import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "sans-serif"',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: 'var(--text-primary)',
    fontFamily: "'Poppins-Medium', sans-serif",
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: 'var(--text-primary)',
      fontFamily: 'Poppins-Medium',
    },
    subtitle1:{
        fontSize: '1rem',
        fontWeight: 400,
        color: 'var(--text-primary)',
        fontFamily: 'Poppins-Regular',
    }
    
  }
});
