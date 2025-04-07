import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie';
import { getFavorites, addFavorite, removeFavorite } from '../../services/favoritesService';

interface FavoritesState {
  favorites: Movie[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  status: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk<Movie[]>('favorites/fetchFavorites', async () => {
  return await getFavorites();
});

export const addFavoriteThunk = createAsyncThunk<Movie, Movie>(
  'favorites/addFavorite',
  async (movie) => {
    return await addFavorite(movie.id);
  }
);

export const removeFavoriteThunk = createAsyncThunk<number, number>(
  'favorites/removeFavorite',
  async (movieId) => {
    return await removeFavorite(movieId);
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'idle';
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки избранных фильмов';
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((movie) => movie.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
