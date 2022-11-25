import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  places: [],
  weatherForecast: null,
};

export const fetchLocationByPlace = createAsyncThunk(
  "fetchLocationByPlace",
  async (query) => {
    const url = `https://geocode.xyz/${query}?json=1&auth=${process.env.REACT_APP_GEO_KEY}`
    const response = await fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error.message));

    return response;
  }
);

export const fetchWeatherAsync = createAsyncThunk(
  "fetchWeatherForecast",
  async (coords) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m`
    )
      .then((response) => response.json())
      .catch((error) => console.error(error.message));

    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
    setWeatherForecast: (state, action) => {
      state.weatherForecast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherAsync.fulfilled, (state, action) => {
        state.weatherForecast = action.payload;
      })
      .addCase(fetchLocationByPlace.fulfilled, (state, action) => {
        state.places = [...state.places, action.payload];
      });
  },
});

export const { setUser, logOut, setWeatherForecast } = authSlice.actions;

export const state = (state) => state.auth;

export default authSlice.reducer;
