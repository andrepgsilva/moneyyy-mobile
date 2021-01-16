import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import i18n from '../../i18n';
import { ErrorsFromServerHandler } from '../../utils';

interface InitialState {
  bills: Array<Object>,
  serverAuthErrors: Array<string>
}

export const getBills = createAsyncThunk(
  'bills/index',

  async (arg, { rejectWithValue, dispatch }) => {
    const getBillsPromise = new Promise((resolve) => {
      SecureStore.getItemAsync('access_token')
        .then((accessToken: any) => {
          axios.get('/api/mobile/bills', { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
              dispatch(setBills(response.data.data));
              // After... it can get pagination content here too response.data without response.data.data
              resolve(response.data.data);
            })
            .catch(error => {
              rejectWithValue(error.response.data);
            });
        });
    });

    return await getBillsPromise;
  }
);

const initialState: InitialState = {
  bills: [],
  serverAuthErrors: []
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    clearServerAuthErrors: (state) => {
      state.serverAuthErrors = [];
    },
    setBills: (state, action: any) => {
      state.bills = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getBills.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });
  }
});

export const { clearServerAuthErrors, setBills } = billsSlice.actions;

export const serverLoginErrorsSelector = (state: any) => {
  return state.bills.serverAuthErrors;
};

export const billsSelector = (state: any) => {
  return state.bills.bills;
};

export default billsSlice.reducer;
