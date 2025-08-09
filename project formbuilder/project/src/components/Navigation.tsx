import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Add, Preview, List } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCurrentView } from '../store/slices/navigationSlice';
import { clearCurrentForm } from '../store/slices/formBuilderSlice';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.navigation.currentView);

  const handleViewChange = (view: 'CREATE_FORM' | 'PREVIEW_FORM' | 'MY_FORMS') => {
    if (view === 'CREATE_FORM') {
      dispatch(clearCurrentForm());
    }
    dispatch(setCurrentView(view));
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Form Builder
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color={currentView === 'CREATE_FORM' ? 'secondary' : 'inherit'}
            startIcon={<Add />}
            onClick={() => handleViewChange('CREATE_FORM')}
            variant={currentView === 'CREATE_FORM' ? 'contained' : 'text'}
          >
            Create Form
          </Button>
          <Button
            color={currentView === 'PREVIEW_FORM' ? 'secondary' : 'inherit'}
            startIcon={<Preview />}
            onClick={() => handleViewChange('PREVIEW_FORM')}
            variant={currentView === 'PREVIEW_FORM' ? 'contained' : 'text'}
          >
            Preview
          </Button>
          <Button
            color={currentView === 'MY_FORMS' ? 'secondary' : 'inherit'}
            startIcon={<List />}
            onClick={() => handleViewChange('MY_FORMS')}
            variant={currentView === 'MY_FORMS' ? 'contained' : 'text'}
          >
            My Forms
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;