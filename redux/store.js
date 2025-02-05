import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/FavoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});

export default store;
