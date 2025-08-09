import React from 'react';
import { Box } from '@mui/material';
import { FormField } from '../../types';
import FieldRenderer from './FieldRenderer';

interface FormRendererProps {
  fields: FormField[];
  formData: Record<string, any>;
  onDataChange: (fieldId: string, value: any) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  formData,
  onDataChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {fields.map((field) => (
        <FieldRenderer
          key={field.id}
          field={field}
          value={formData[field.id] ?? field.defaultValue ?? ''}
          onChange={(value) => onDataChange(field.id, value)}
          allFormData={formData}
        />
      ))}
    </Box>
  );
};

export default FormRenderer;