import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register, getProfile } from '../../services/authService';
import { AuthInfo, RegisterData, SuccessfulResult, User } from '../../types/authUser';

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<User, AuthInfo, { rejectValue: string }>(
  'auth/login',
  async (data: AuthInfo, { rejectWithValue }) => {
    try {
      await login(data);
      const user: User = await getProfile();
      return user;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка при логине');
    }
  }
);

export const fetchProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user: User = await getProfile();
      return user;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка при получении профиля');
    }
  }
);

export const logoutUser = createAsyncThunk<SuccessfulResult, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logout();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка при логауте');
    }
  }
);

export const registerUser = createAsyncThunk<User, RegisterData, { rejectValue: string }>(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const newUser: User = await register(data);
      return newUser;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Неизвестная ошибка при регистрации');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка при логине';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
