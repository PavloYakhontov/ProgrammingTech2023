import { Global } from '@type/models/global';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Boundary } from '@core/http/Boundary';
import { __app__ } from '@core/MainActivity';
import { __current_user__ } from '@core/CurrentUser';

const initialState: Global = {
  fatalModal: {
    show: false,
    boundary: null,
  },
  toast: {
    show: false,
    callback: null,
  },
  isAuth: __current_user__.isAuth,
};

const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openFatalModal(state, { payload: { show, boundary } }: PayloadAction<{show: boolean, boundary: Boundary}>) {
      state.fatalModal = { show, boundary };
    },
    closeFatalModal(state) {
      state.fatalModal = {
        show: false,
        boundary: null,
      };
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

const actions = GlobalSlice.actions;
const reducer = GlobalSlice.reducer;

export { actions as globalActions, reducer as globalReducer };
