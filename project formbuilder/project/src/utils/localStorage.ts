import { FormSchema } from '../types';

const FORMS_STORAGE_KEY = 'formBuilder_savedForms';

export const saveFormToStorage = (form: FormSchema): void => {
  try {
    const existingForms = loadFormsFromStorage();
    const updatedForms = [...existingForms, form];
    localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));
  } catch (error) {
    console.error('Error saving form to localStorage:', error);
  }
};

export const loadFormsFromStorage = (): FormSchema[] => {
  try {
    const stored = localStorage.getItem(FORMS_STORAGE_KEY);
    if (stored) {
      const forms = JSON.parse(stored);
      // Convert date strings back to Date objects
      return forms.map((form: any) => ({
        ...form,
        createdAt: new Date(form.createdAt),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading forms from localStorage:', error);
    return [];
  }
};

export const deleteFormFromStorage = (formId: string): void => {
  try {
    const forms = loadFormsFromStorage();
    const filteredForms = forms.filter(form => form.id !== formId);
    localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(filteredForms));
  } catch (error) {
    console.error('Error deleting form from localStorage:', error);
  }
};