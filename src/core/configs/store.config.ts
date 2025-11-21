import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from '@application/redux';

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
