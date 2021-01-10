import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import i18n from '../../i18n';
import { AuthErrorsHandler, formatAuthErrors, hasOwnProperty } from '../../utils';

interface UserCredentials {
  name?: string,
  email: string,
  password: string,
  // eslint-disable-next-line camelcase
  password_confirmation?: string,
  device?: string,
  lang?: string,
}

interface InitialState {
  user: string|null,
  tokens: {
    accessToken: string|null,
    refreshToken: string|null,
  },
  serverAuthErrors: Array<string>
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

export const signup = createAsyncThunk(
  'users/signup',

  async (credentials: UserCredentials, { rejectWithValue }) => {
    credentials.device = 'mobile';
    credentials.password_confirmation = credentials.password;
    credentials.lang = i18n.locale;

    try {
      return (await axios.post('/api/auth/register', credentials)).data;
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
  serverAuthErrors: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearServerAuthErrors: (state) => {
      state.serverAuthErrors = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.email;

      SecureStore.setItemAsync('access_token', action.payload.access_token);
      SecureStore.setItemAsync('refresh_token', action.payload.refresh_token);
    });

    builder.addCase(login.rejected, (state, action: any) => {
      AuthErrorsHandler(state, action);
    });

    builder.addCase(signup.rejected, (state, action: any) => {
      AuthErrorsHandler(state, action);
    });
  }
});

export const { clearServerAuthErrors } = authSlice.actions;

export const userSelector = (state: any) => {
  return state.auth.user;
};

export const serverLoginErrorsSelector = (state: any) => {
  return state.auth.serverAuthErrors;
};

export default authSlice.reducer;
