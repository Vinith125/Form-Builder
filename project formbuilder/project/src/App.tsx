import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { store } from './store';
import { useAppSelector } from './hooks/redux';
import Navigation from './components/Navigation';
import CreateFormView from './components/CreateForm';
import PreviewFormView from './components/PreviewForm';
import MyFormsView from './components/MyForms';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const currentView = useAppSelector((state) => state.navigation.currentView);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'CREATE_FORM':
        return <CreateFormView />;
      case 'PREVIEW_FORM':
        return <PreviewFormView />;
      case 'MY_FORMS':
        return <MyFormsView />;
      default:
        return <CreateFormView />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      {renderCurrentView()}
    </Box>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;