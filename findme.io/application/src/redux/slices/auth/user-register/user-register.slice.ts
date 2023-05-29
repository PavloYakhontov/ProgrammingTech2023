import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IUserRegisterSlice,
} from '@type/models/user';
import { ISliceBaseModel } from '@type/models';
import { IBasicInformationFormTemplate, ILocationFormTemplate, IPersonalInformationFormTemplate } from '@utils/forms';

const initialState: IUserRegisterSlice & ISliceBaseModel = {
  email: '',
  password: '',
  phone: '',
  rePassword: '',
  firstName: '',
  lastName: '',
  birthday: `${Date.now()}`,
  details: '',
  city: '',
  country: '',
  hasInterest: false,
  gender: 'It doesn\'t matter',
  hasTags: false,
  hasSelectedMood: false,
  loading: false,
  error: {
    errorMessage: '',
    isError: false,
  },
};

const UserRegisterSlice = createSlice({
  name: 'user_register',
  initialState,
  reducers: {
    updatePhoneNumber(state, action: PayloadAction<string>) {
      console.log(action);
      state.phone = action.payload;
    },
    updateBasicInformationData(state, action: PayloadAction<IBasicInformationFormTemplate>) {
      const { email, rePassword, password } = action.payload;
      if (email && rePassword && password) {
        state.email = email;
        state.password = password;
        state.rePassword = rePassword;
      }
    },
    updateUserInformationData(state, action: PayloadAction<IPersonalInformationFormTemplate>) {
      const { details, firstName, lastName, birthday } = action.payload;
      if (firstName && lastName && birthday) {
        state.details = details;
        state.firstName = firstName;
        state.lastName = lastName;
        state.birthday = `${birthday || Date.now()}`;
      }
    },
    updateLocationInformationData(state, action: PayloadAction<ILocationFormTemplate>) {
      const { country, city } = action.payload;
      if (country && city) {
        state.country = country;
        state.city = city;
      }
    },

    // register from api:
    registerStart(state, action) {
      state = { ...state,
        loading: true,
        error: {
          errorMessage: '',
          isError: false,
        } };
    },
    registerError(state, action) {
      state = { ...state,
        loading: false,
        error: action.payload,
      };
    },
    registerSuccess(state, action) {
      state = { ...state,
        loading: false,
        error: {
          errorMessage: '',
          isError: false,
        } };
    },
  },
});

const actions = UserRegisterSlice.actions;
const reducer = UserRegisterSlice.reducer;

export { actions as userRegisterActions, reducer as userRegisterReducer };
