import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFormName, saveCurrentForm } from '../../store/slices/formBuilderSlice';
import FieldBuilder from './FieldBuilder';
import FieldList from './FieldList';

const CreateFormView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentForm } = useAppSelector((state) => state.formBuilder);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveForm = () => {
    if (currentForm.name && currentForm.fields.length > 0) {
      dispatch(saveCurrentForm());
      setShowSaveDialog(false);
    } else {
      setShowSaveDialog(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Form
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Form Name"
            value={currentForm.name}
            onChange={(e) => dispatch(setFormName(e.target.value))}
            variant="outlined"
            required
            error={showSaveDialog && !currentForm.name}
            helperText={showSaveDialog && !currentForm.name ? 'Form name is required' : ''}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Add Fields
            </Typography>
            <FieldBuilder />
          </Box>

          <Box sx={{ flex: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Form Fields ({currentForm.fields.length})
              </Typography>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveForm}
                disabled={!currentForm.name || currentForm.fields.length === 0}
              >
                Save Form
              </Button>
            </Box>
            <FieldList />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateFormView;