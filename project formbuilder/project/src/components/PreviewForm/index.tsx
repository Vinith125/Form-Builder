import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Alert,
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentView } from '../../store/slices/navigationSlice';
import { loadFormForPreview } from '../../store/slices/formBuilderSlice';
import FormRenderer from './FormRenderer';

const PreviewFormView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentForm } = useAppSelector((state) => state.formBuilder);
  const { selectedFormId } = useAppSelector((state) => state.navigation);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (selectedFormId) {
      dispatch(loadFormForPreview(selectedFormId));
    }
  }, [selectedFormId, dispatch]);

  const handleFormDataChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmitForm = () => {
    // In a real app, you'd send this to a server
    console.log('Form submitted with data:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBack = () => {
    dispatch(setCurrentView('MY_FORMS'));
  };

  if (!currentForm.name && !currentForm.fields.length) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No Form to Preview
          </Typography>
          <Typography color="textSecondary" paragraph>
            Either create a new form or select an existing form from "My Forms" to preview.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => dispatch(setCurrentView('CREATE_FORM'))}
            >
              Create New Form
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(setCurrentView('MY_FORMS'))}
            >
              My Forms
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {selectedFormId && (
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              Back to Forms
            </Button>
          )}
          <Typography variant="h4" component="div">
            {currentForm.name || 'Form Preview'}
          </Typography>
        </Box>

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Form submitted successfully!
          </Alert>
        )}

        <FormRenderer
          fields={currentForm.fields}
          formData={formData}
          onDataChange={handleFormDataChange}
        />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSubmitForm}
            size="large"
          >
            Submit Form
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PreviewFormView;