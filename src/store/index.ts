import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import BillsReducer from './reducers/BillsReducer';
import QueueReducer from './reducers/QueueReducer';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    bills: BillsReducer,
    queue: QueueReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
export type AppDispatch = typeof store.dispatch;
