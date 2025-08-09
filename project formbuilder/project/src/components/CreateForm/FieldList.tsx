import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import {
  Delete,
  DragIndicator,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteField } from '../../store/slices/formBuilderSlice';

const FieldList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.formBuilder.currentForm);

  const handleDeleteField = (fieldId: string) => {
    dispatch(deleteField(fieldId));
  };

  const getFieldTypeColor = (type: string) => {
    const colors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error'> = {
      text: 'primary',
      number: 'secondary',
      textarea: 'info',
      select: 'success',
      radio: 'warning',
      checkbox: 'error',
      date: 'secondary',
    };
    return colors[type] || 'default';
  };

  if (fields.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" align="center">
            No fields added yet. Use the field builder to add some fields.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <List>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <ListItem
              sx={{
                display: 'block',
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <IconButton size="small" sx={{ mt: 0.5 }}>
                  <DragIndicator />
                </IconButton>
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {field.label}
                    </Typography>
                    {field.required && (
                      <CheckCircle color="success" fontSize="small" />
                    )}
                    {!field.required && (
                      <RadioButtonUnchecked color="disabled" fontSize="small" />
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    <Chip
                      label={field.type}
                      color={getFieldTypeColor(field.type)}
                      size="small"
                    />
                    {field.required && (
                      <Chip label="Required" color="error" size="small" />
                    )}
                    {field.defaultValue && (
                      <Chip
                        label={`Default: ${field.defaultValue}`}
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Box>

                  {field.validationRules.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        Validation rules: {field.validationRules.length}
                      </Typography>
                    </Box>
                  )}

                  {field.options && field.options.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        Options: {field.options.map(opt => opt.label).join(', ')}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <IconButton
                  color="error"
                  onClick={() => handleDeleteField(field.id)}
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
            {index < fields.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default FieldList;