import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { ValidationRule, FieldType } from '../../types';

interface ValidationRulesBuilderProps {
  rules: ValidationRule[];
  onChange: (rules: ValidationRule[]) => void;
  fieldType: FieldType;
}

const ValidationRulesBuilder: React.FC<ValidationRulesBuilderProps> = ({
  rules,
  onChange,
  fieldType,
}) => {
  const [ruleType, setRuleType] = useState<ValidationRule['type']>('required');
  const [ruleValue, setRuleValue] = useState<string>('');
  const [ruleMessage, setRuleMessage] = useState<string>('');

  const getAvailableRuleTypes = (): Array<{ value: ValidationRule['type']; label: string }> => {
    const baseRules = [
      { value: 'required' as const, label: 'Required' },
    ];

    if (fieldType === 'text' || fieldType === 'textarea') {
      baseRules.push(
        { value: 'minLength' as const, label: 'Minimum Length' },
        { value: 'maxLength' as const, label: 'Maximum Length' },
        { value: 'email' as const, label: 'Email Format' },
        { value: 'password' as const, label: 'Password (8+ chars, 1 number)' }
      );
    }

    if (fieldType === 'number') {
      baseRules.push(
        { value: 'minLength' as const, label: 'Minimum Value' },
        { value: 'maxLength' as const, label: 'Maximum Value' }
      );
    }

    return baseRules;
  };

  const handleAddRule = () => {
    if (!ruleMessage.trim()) return;

    const newRule: ValidationRule = {
      type: ruleType,
      value: ['minLength', 'maxLength'].includes(ruleType) ? parseInt(ruleValue) || 0 : ruleValue,
      message: ruleMessage.trim(),
    };

    // Don't add duplicate rules
    const isDuplicate = rules.some(rule => rule.type === newRule.type);
    if (!isDuplicate) {
      onChange([...rules, newRule]);
    }

    setRuleValue('');
    setRuleMessage('');
  };

  const handleRemoveRule = (index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  const needsValue = ['minLength', 'maxLength'].includes(ruleType);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <FormControl size="small">
          <InputLabel>Rule Type</InputLabel>
          <Select
            value={ruleType}
            onChange={(e) => setRuleType(e.target.value as ValidationRule['type'])}
            label="Rule Type"
          >
            {getAvailableRuleTypes().map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {needsValue && (
          <TextField
            size="small"
            label={ruleType === 'minLength' ? 'Minimum' : 'Maximum'}
            value={ruleValue}
            onChange={(e) => setRuleValue(e.target.value)}
            type="number"
          />
        )}

        <TextField
          size="small"
          label="Error Message"
          value={ruleMessage}
          onChange={(e) => setRuleMessage(e.target.value)}
          placeholder="Enter validation error message"
        />

        <Button
          size="small"
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddRule}
          disabled={!ruleMessage.trim() || (needsValue && !ruleValue)}
        >
          Add Rule
        </Button>
      </Box>

      {rules.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Active Rules:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {rules.map((rule, index) => (
              <Chip
                key={index}
                label={`${rule.type}${rule.value ? `: ${rule.value}` : ''}`}
                onDelete={() => handleRemoveRule(index)}
                deleteIcon={<Delete />}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ValidationRulesBuilder;