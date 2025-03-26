import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCoords } from '../../api/weatherService';

export const getWeatherByCoords = createAsyncThunk(
  'weather/getWeatherByCoords',
  async ({ lat, lon }) => {
    const data = await fetchWeatherByCoords(lat, lon);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeatherByCoords.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer;
