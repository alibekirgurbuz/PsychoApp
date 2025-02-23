import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/FavoritesSlice';
import testSonuclariReducer from './slices/testSonuclariSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    testSonuclari: testSonuclariReducer,
  },
});

export default store;
