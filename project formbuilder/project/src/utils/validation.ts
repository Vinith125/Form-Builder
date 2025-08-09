import { ValidationRule } from '../types';

export const validateField = (value: any, rules: ValidationRule[]): string[] => {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.push(rule.message);
        }
        break;
      case 'minLength':
        if (value && typeof value === 'string' && value.length < (rule.value as number)) {
          errors.push(rule.message);
        }
        break;
      case 'maxLength':
        if (value && typeof value === 'string' && value.length > (rule.value as number)) {
          errors.push(rule.message);
        }
        break;
      case 'email':
        if (value && typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(rule.message);
          }
        }
        break;
      case 'password':
        if (value && typeof value === 'string') {
          if (value.length < 8 || !/\d/.test(value)) {
            errors.push(rule.message);
          }
        }
        break;
    }
  }

  return errors;
};

export const calculateDerivedValue = (
  formula: string,
  calculationType: string,
  parentFields: string[],
  formValues: Record<string, any>
): any => {
  try {
    switch (calculationType) {
      case 'age_from_birth':
        const birthDate = formValues[parentFields[0]];
        if (birthDate) {
          const today = new Date();
          const birth = new Date(birthDate);
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          return age;
        }
        return '';
      case 'sum':
        return parentFields.reduce((sum, fieldId) => {
          const value = parseFloat(formValues[fieldId]) || 0;
          return sum + value;
        }, 0);
      case 'concat':
        return parentFields.map(fieldId => formValues[fieldId] || '').join(' ');
      default:
        return '';
    }
  } catch (error) {
    console.error('Error calculating derived value:', error);
    return '';
  }
};