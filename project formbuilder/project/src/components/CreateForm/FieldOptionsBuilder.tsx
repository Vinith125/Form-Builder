import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { SelectOption } from '../../types';

interface FieldOptionsBuilderProps {
  options: SelectOption[];
  onChange: (options: SelectOption[]) => void;
}

const FieldOptionsBuilder: React.FC<FieldOptionsBuilderProps> = ({ options, onChange }) => {
  const [optionValue, setOptionValue] = useState('');
  const [optionLabel, setOptionLabel] = useState('');

  const handleAddOption = () => {
    if (!optionValue.trim() || !optionLabel.trim()) return;

    const newOption: SelectOption = {
      value: optionValue.trim(),
      label: optionLabel.trim(),
    };

    // Don't add duplicate values
    const isDuplicate = options.some(option => option.value === newOption.value);
    if (!isDuplicate) {
      onChange([...options, newOption]);
    }

    setOptionValue('');
    setOptionLabel('');
  };

  const handleRemoveOption = (index: number) => {
    onChange(options.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Options
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          label="Value"
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          size="small"
          label="Label"
          value={optionLabel}
          onChange={(e) => setOptionLabel(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          size="small"
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddOption}
          disabled={!optionValue.trim() || !optionLabel.trim()}
        >
          Add
        </Button>
      </Box>

      {options.length > 0 && (
        <List dense>
          {options.map((option, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={option.label}
                secondary={`Value: ${option.value}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveOption(index)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FieldOptionsBuilder;