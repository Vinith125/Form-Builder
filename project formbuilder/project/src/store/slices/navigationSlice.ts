import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationState, ViewType } from '../../types';

const initialState: NavigationState = {
  currentView: 'CREATE_FORM',
  selectedFormId: undefined,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
    setSelectedForm: (state, action: PayloadAction<string>) => {
      state.selectedFormId = action.payload;
      state.currentView = 'PREVIEW_FORM';
    },
  },
});

export const { setCurrentView, setSelectedForm } = navigationSlice.actions;
export default navigationSlice.reducer;