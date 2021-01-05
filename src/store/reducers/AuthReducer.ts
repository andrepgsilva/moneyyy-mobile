import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserCredentials {
  email: string,
  password: string
  device?: string
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
      state.tokens.accessToken = action.payload.access_token;
      state.tokens.refreshToken = action.payload.refresh_token;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      if (action.payload !== null) {
        state.serverLoginErrors.push(action.payload.error);
      }
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
