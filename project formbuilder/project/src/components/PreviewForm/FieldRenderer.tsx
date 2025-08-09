import React, { useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { FormField } from '../../types';
import { validateField, calculateDerivedValue } from '../../utils/validation';

interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  allFormData: Record<string, any>;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  allFormData,
}) => {
  const errors = validateField(value, field.validationRules);
  const hasError = errors.length > 0;

  // Handle derived fields
  useEffect(() => {
    if (field.isDerived && field.derivedConfig) {
      const derivedValue = calculateDerivedValue(
        field.derivedConfig.formula,
        field.derivedConfig.calculationType,
        field.derivedConfig.parentFields,
        allFormData
      );
      onChange(derivedValue);
    }
  }, [field, allFormData, onChange]);

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={hasError}
            helperText={hasError ? errors.join(', ') : ''}
            disabled={field.isDerived}
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            label={field.label}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={hasError}
            helperText={hasError ? errors.join(', ') : ''}
            disabled={field.isDerived}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            label={field.label}
            multiline
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={hasError}
            helperText={hasError ? errors.join(', ') : ''}
            disabled={field.isDerived}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth error={hasError} required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              label={field.label}
              disabled={field.isDerived}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{errors.join(', ')}</FormHelperText>}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl error={hasError} required={field.required} disabled={field.isDerived}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {hasError && <FormHelperText>{errors.join(', ')}</FormHelperText>}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl error={hasError} disabled={field.isDerived}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(value)}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label={field.label}
              />
            </FormGroup>
            {hasError && <FormHelperText>{errors.join(', ')}</FormHelperText>}
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            fullWidth
            label={field.label}
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            error={hasError}
            helperText={hasError ? errors.join(', ') : ''}
            InputLabelProps={{ shrink: true }}
            disabled={field.isDerived}
          />
        );

      default:
        return null;
    }
  };

  return renderField();
};

export default FieldRenderer;