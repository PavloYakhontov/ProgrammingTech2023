import { Dispatch } from '@reduxjs/toolkit';
import { userRegisterActions } from '@redux/slices/auth/user-register/user-register.slice';
import { IUserRegisterSlice } from '@type/models/user';
import { RequestForge } from '@core/http/RequestForge';
import { Boundary } from '@core/http/Boundary';
import { Action } from '@type/models';

export const userRegisterThunk = (body: Omit<IUserRegisterSlice, 'hasSelectedMood' | 'hasTags' | 'hasInterest'>) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch(userRegisterActions.registerStart);
    const response = await RequestForge.registerCall(body);
    if (response instanceof Boundary) {
      dispatch(userRegisterActions.registerError);
      return;
    }
    dispatch(userRegisterActions.registerSuccess);
  } catch (e) {
    dispatch(userRegisterActions.registerError);
    console.log('userRegisterThunk.ex', e);
  }
};
