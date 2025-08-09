import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { Preview, Delete, Add } from '@mui/icons-material';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadSavedForms } from '../../store/slices/formBuilderSlice';
import { setSelectedForm, setCurrentView } from '../../store/slices/navigationSlice';

const MyFormsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { savedForms } = useAppSelector((state) => state.formBuilder);

  useEffect(() => {
    dispatch(loadSavedForms());
  }, [dispatch]);

  const handlePreviewForm = (formId: string) => {
    dispatch(setSelectedForm(formId));
  };

  const handleCreateNew = () => {
    dispatch(setCurrentView('CREATE_FORM'));
  };

  if (savedForms.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            My Forms
          </Typography>
          <Typography color="textSecondary" paragraph>
            You haven't created any forms yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateNew}
            size="large"
          >
            Create Your First Form
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            My Forms ({savedForms.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateNew}
          >
            Create New Form
          </Button>
        </Box>

        <Grid container spacing={3}>
          {savedForms.map((form) => (
            <Grid item xs={12} md={6} lg={4} key={form.id}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {form.name}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`${form.fields.length} fields`}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={form.fields.filter(f => f.required).length + ' required'}
                      color="secondary"
                      size="small"
                    />
                  </Box>

                  <Typography color="textSecondary" variant="body2">
                    Created: {format(form.createdAt, 'MMM d, yyyy')}
                  </Typography>

                  {form.fields.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="textSecondary">
                        Fields: {form.fields.slice(0, 3).map(f => f.label).join(', ')}
                        {form.fields.length > 3 && ` +${form.fields.length - 3} more`}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Preview />}
                    onClick={() => handlePreviewForm(form.id)}
                  >
                    Preview
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    color="error"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default MyFormsView;