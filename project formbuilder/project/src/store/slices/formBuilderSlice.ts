import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormBuilderState, FormField, FormSchema } from '../../types';
import { loadFormsFromStorage, saveFormToStorage } from '../../utils/localStorage';

const initialState: FormBuilderState = {
  currentForm: {
    name: '',
    fields: [],
  },
  savedForms: [],
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.currentForm.name = action.payload;
    },
    addField: (state, action: PayloadAction<FormField>) => {
      state.currentForm.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<{ id: string; field: Partial<FormField> }>) => {
      const index = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.currentForm.fields[index] = { ...state.currentForm.fields[index], ...action.payload.field };
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
    },
    reorderFields: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const fields = [...state.currentForm.fields];
      const draggedField = fields[dragIndex];
      fields.splice(dragIndex, 1);
      fields.splice(hoverIndex, 0, draggedField);
      state.currentForm.fields = fields;
    },
    saveCurrentForm: (state) => {
      if (state.currentForm.name && state.currentForm.fields.length > 0) {
        const formSchema: FormSchema = {
          id: Date.now().toString(),
          name: state.currentForm.name,
          fields: state.currentForm.fields,
          createdAt: new Date(),
        };
        state.savedForms.push(formSchema);
        saveFormToStorage(formSchema);
        // Reset current form
        state.currentForm = { name: '', fields: [] };
      }
    },
    loadSavedForms: (state) => {
      state.savedForms = loadFormsFromStorage();
    },
    loadFormForPreview: (state, action: PayloadAction<string>) => {
      const form = state.savedForms.find(f => f.id === action.payload);
      if (form) {
        state.currentForm = {
          name: form.name,
          fields: form.fields,
        };
      }
    },
    clearCurrentForm: (state) => {
      state.currentForm = { name: '', fields: [] };
    },
  },
});

export const {
  setFormName,
  addField,
  updateField,
  deleteField,
  reorderFields,
  saveCurrentForm,
  loadSavedForms,
  loadFormForPreview,
  clearCurrentForm,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;