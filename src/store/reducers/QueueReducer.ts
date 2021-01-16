import { createSlice } from '@reduxjs/toolkit';
import actionQueue from '../../utils/ActionQueue';

const initialState = {
  queue: {}
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setQueueData: (state, action: any) => {
      state.queue = action.payload;
    }
  }
});

export const { setQueueData } = queueSlice.actions;

export const queueSelector = (state: any) => {
  return state.queue.queue;
};

export default queueSlice.reducer;
