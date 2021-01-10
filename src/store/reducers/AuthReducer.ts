import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import i18n from '../../i18n';
import { hasOwnProperty } from '../../utils';

interface UserCredentials {
  email: string,
  password: string
  device?: string,
  lang?: string,
}

interface InitialState {
  user: string|null,
  tokens: {
    accessToken: string|null,
    refreshToken: string|null,
  },
  serverLoginErrors: Array<string>
}

export const login = createAsyncThunk(
  'users/login',

  async (credentials: UserCredentials, { rejectWithValue }) => {
    credentials.device = 'mobile';
    credentials.lang = i18n.locale;

    try {
      return (await axios.post('/api/auth/login', credentials)).data;
    } catch (err) {
      return rejectWithValue(err.response.data as Error);
    }
  }
);

const initialState: InitialState = {
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null
  },
  serverLoginErrors: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearServerLoginErrors: (state) => {
      state.serverLoginErrors = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.email;

      SecureStore.setItemAsync('access_token', action.payload.access_token);
      SecureStore.setItemAsync('refresh_token', action.payload.refresh_token);
    });
    builder.addCase(login.rejected, (state, action: any) => {
      if (typeof action.payload === 'object') {
        let errors: Array<string> = [action.payload.error];

        if (hasOwnProperty(action.payload, 'errors')) {
          errors = [];

          let fieldErrorPropertyName: string = '';

          for (fieldErrorPropertyName in action.payload.errors) {
            const fieldErrorPropertyValue = action.payload.errors[fieldErrorPropertyName];
            // errors.push('\n');
            errors.push(fieldErrorPropertyValue[0]);
          }
        }

        state.serverLoginErrors = errors;

        return;
      }

      state.serverLoginErrors.push(i18n.t('auth.something_went_wrong'));
    });
  }
});

export const { clearServerLoginErrors } = authSlice.actions;

export const userSelector = (state: any) => {
  return state.auth.user;
};

export const serverLoginErrorsSelector = (state: any) => {
  return state.auth.serverLoginErrors;
};

export default authSlice.reducer;
