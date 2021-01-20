import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import i18n from '../../i18n';
import { ErrorsFromServerHandler } from '../../utils';

interface UserCredentials {
  name?: string,
  email: string,
  password?: string,
  // eslint-disable-next-line camelcase
  password_confirmation?: string,
  // eslint-disable-next-line camelcase
  password_confirmation_token?: string,
  device?: string,
  lang?: string,
}

interface InitialState {
  user: string|null,
  tokens: {
    accessToken: string|null,
    refreshToken: string|null,
  },
  refreshTokenLoading: boolean,
  serverAuthErrors: Array<string>
}

export const login = createAsyncThunk(
  'auth/login',

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

export const logout = createAsyncThunk(
  'auth/logout',

  async (arg, { dispatch }) => {
    dispatch(setUserEmail(null));

    SecureStore.setItemAsync('user', '');
    SecureStore.setItemAsync('access_token', '');
    SecureStore.setItemAsync('refresh_token', '');
  }
);

export const signup = createAsyncThunk(
  'auth/signup',

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

export const getCodeToRecoverPassword = createAsyncThunk(
  'auth/getCodeToRecoverPassword',

  async (credentials: UserCredentials, { rejectWithValue }) => {
    credentials.lang = i18n.locale;

    try {
      return (await axios.post('/api/forgot-password', credentials)).data;
    } catch (err) {
      return rejectWithValue(err.response.data as Error);
    }
  }
);

export const confirmCodeToRecoverPassword = createAsyncThunk(
  'auth/confirmCodeToRecoverPassword',

  async (credentials: UserCredentials, { rejectWithValue }) => {
    credentials.lang = i18n.locale;

    try {
      return (await axios.post('/api/token-match', credentials)).data;
    } catch (err) {
      return rejectWithValue(err.response.data as Error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',

  async (credentials: UserCredentials, { rejectWithValue }) => {
    credentials.password_confirmation = credentials.password;
    credentials.lang = i18n.locale;

    try {
      return (await axios.put('/api/reset-password', credentials)).data;
    } catch (err) {
      return rejectWithValue(err.response.data as Error);
    }
  }
);

const initialState: InitialState = {
  user: '',
  tokens: {
    accessToken: null,
    refreshToken: null
  },
  refreshTokenLoading: false,
  serverAuthErrors: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearServerAuthErrors: (state) => {
      state.serverAuthErrors = [];
    },
    setUserEmail: (state, action: any) => {
      state.user = action.payload.email;
    },
    toggleRefreshTokenLoading: (state) => {
      state.refreshTokenLoading = !state.refreshTokenLoading;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.email;
      SecureStore.setItemAsync('user', action.payload.email);

      SecureStore.setItemAsync('access_token', action.payload.access_token);

      SecureStore.setItemAsync('refresh_token', action.payload.refresh_token);
    });

    builder.addCase(login.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });

    builder.addCase(signup.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });

    builder.addCase(getCodeToRecoverPassword.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });

    builder.addCase(confirmCodeToRecoverPassword.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });

    builder.addCase(resetPassword.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });
  }
});

export const { clearServerAuthErrors, setUserEmail, toggleRefreshTokenLoading } = authSlice.actions;

export const userSelector = (state: any) => {
  return state.auth.user;
};

export const serverLoginErrorsSelector = (state: any) => {
  return state.auth.serverAuthErrors;
};

export const userEmailSelector = (state: any) => {
  return state.auth.user;
};

export default authSlice.reducer;
