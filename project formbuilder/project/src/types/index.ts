export type ViewType = 'CREATE_FORM' | 'PREVIEW_FORM' | 'MY_FORMS';

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'password';
  value?: number | string;
  message: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DerivedFieldConfig {
  parentFields: string[];
  formula: string; // Simple formula like "field1 + field2" or calculation type
  calculationType: 'age_from_birth' | 'sum' | 'concat' | 'custom';
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  validationRules: ValidationRule[];
  options?: SelectOption[]; // For select and radio fields
  isDerived?: boolean;
  derivedConfig?: DerivedFieldConfig;
}

export interface FormSchema {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: Date;
}

export interface FormBuilderState {
  currentForm: {
    name: string;
    fields: FormField[];
  };
  savedForms: FormSchema[];
}

export interface NavigationState {
  currentView: ViewType;
  selectedFormId?: string;
}