import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import postsReducer from './posts/postSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist config for user slice
const userPersistConfig = {
  key: 'user',
  storage,
  version: 1,
};

// Persist only the user slice
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combine reducers with posts excluded from persistence
const rootReducer = combineReducers({
  user: persistedUserReducer, // User is persisted
  posts: postsReducer, // Posts are not persisted
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
