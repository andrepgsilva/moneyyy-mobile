import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { ErrorsFromServerHandler } from '../../utils';

export type Pagination = {
  currentPage: number,
};

interface InitialState {
  bills: Array<Object>,
  serverAuthErrors: Array<string>,
}

type payloadGetBills = {
  page: number
};

export const getBills = createAsyncThunk(
  'bills/index',

  async (payload: payloadGetBills, { rejectWithValue, dispatch }) => {
    const getBillsPromise = new Promise((resolve) => {
      SecureStore.getItemAsync('access_token')
        .then((accessToken: any) => {
          console.log('I am in this page: ' + payload.page);

          axios.get('/api/mobile/bills/?page=' + payload.page, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
              dispatch(setBillsResponseData(response.data));

              resolve(response.data);
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

    setBillsResponseData: (state, action: any) => {
      state.bills = action.payload;
    },

    setBillsForPagination: (state, action: any) => {
      state.bills = [...state.bills, ...action.payload];

      console.log(state.bills);
    }
  },
  extraReducers: builder => {
    builder.addCase(getBills.rejected, (state, action: any) => {
      ErrorsFromServerHandler(state, action);
    });
  }
});

export const { clearServerAuthErrors, setBillsResponseData, setBillsForPagination } = billsSlice.actions;

export const serverLoginErrorsSelector = (state: any) => {
  return state.bills.serverAuthErrors;
};

export const billsSelector = (state: any) => {
  return state.bills.bills.data;
};

export default billsSlice.reducer;
