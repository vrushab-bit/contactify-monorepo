import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1', // The blue color used for the "Add Contact" button and overview underline
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#64748B', // A neutral color for secondary elements
    },
    background: {
      default: '#F8FAFC', // Light gray background color
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A', // Dark text color for headings
      secondary: '#64748B', // Lighter text color for subheadings and secondary text
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '6px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#E2E8F0',
          color: '#64748B',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
            borderColor: '#6366F1',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            color: '#6366F1',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
            },
            '& .MuiListItemIcon-root': {
              color: '#6366F1',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
