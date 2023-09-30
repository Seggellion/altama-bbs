import { configureStore } from '@reduxjs/toolkit';
import apiReducer, { api } from '../api/apiSlice';  // Adjust the path based on your directory structure
import uiReducer from '../ui/uiSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: apiReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Setup listeners for any RTK-Query lifecycle events you want to monitor
api.setupListeners(store.dispatch);

export default store;
