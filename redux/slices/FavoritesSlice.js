import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.favorites.find(item => item.title === action.payload.title);
      if (exists) {
        state.favorites = state.favorites.filter(item => item.title !== action.payload.title);
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    }
  }
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
