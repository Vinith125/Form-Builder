import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/redux';
import { addField } from '../../store/slices/formBuilderSlice';
import { FormField, FieldType, ValidationRule, SelectOption } from '../../types';
import ValidationRulesBuilder from './ValidationRulesBuilder';
import FieldOptionsBuilder from './FieldOptionsBuilder';

const FieldBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const [fieldType, setFieldType] = useState<FieldType>('text');
  const [label, setLabel] = useState('');
  const [required, setRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const handleAddField = () => {
    if (!label.trim()) return;

    const field: FormField = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: fieldType,
      label: label.trim(),
      required,
      defaultValue: defaultValue || undefined,
      validationRules,
      options: ['select', 'radio'].includes(fieldType) ? options : undefined,
      isDerived: false,
    };

    dispatch(addField(field));

    // Reset form
    setLabel('');
    setRequired(false);
    setDefaultValue('');
    setValidationRules([]);
    setOptions([]);
  };

  const fieldTypes: Array<{ value: FieldType; label: string }> = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
    { value: 'radio', label: 'Radio' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' },
  ];

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value as FieldType)}
              label="Field Type"
            >
              {fieldTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Field Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            variant="outlined"
            required
          />

          <TextField
            fullWidth
            label="Default Value"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            variant="outlined"
            type={fieldType === 'number' ? 'number' : fieldType === 'date' ? 'date' : 'text'}
            InputLabelProps={fieldType === 'date' ? { shrink: true } : undefined}
          />

          <FormControlLabel
            control={
              <Switch
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
              />
            }
            label="Required Field"
          />

          {['select', 'radio'].includes(fieldType) && (
            <FieldOptionsBuilder
              options={options}
              onChange={setOptions}
            />
          )}

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Validation Rules
            </Typography>
            <ValidationRulesBuilder
              rules={validationRules}
              onChange={setValidationRules}
              fieldType={fieldType}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddField}
            disabled={!label.trim()}
            fullWidth
          >
            Add Field
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FieldBuilder;