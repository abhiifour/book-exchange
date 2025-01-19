import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import { persistReducer, persistStore } from 'redux-persist';

import bookReducer from './slice/bookSlice';
import userReducer from './slice/userSlice';
import exchangeReducer from './slice/exchangeSlice';
import matchedBookReducer from './slice/matchedBookSlice';

// Persist Configuration
const persistConfig = {
  key: 'root', // Key for local storage
  storage, // Using localStorage
  whitelist: ['userState', 'books'], // Add reducers you want to persist
};

// Root Reducer
const rootReducer = combineReducers({
  books: bookReducer,
  userState: userReducer,
  exchangeState: exchangeReducer,
  matchedBookState: matchedBookReducer,
});

// Create a Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization warning for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store;
