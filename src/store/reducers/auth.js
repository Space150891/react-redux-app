import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateOrCreateUser from "../../api/updateOrCreateUser";

const initialState = {
  user: null,
  places: [],
  weatherForecast: null,
};

export const fetchUserLocation = createAsyncThunk(
  "fetchUserLocation",
  async (query) => {
    const url = `https://geocode.xyz/${query}?json=1&auth=${process.env.REACT_APP_GEO_KEY}`;
    const response = await fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error.message));

    const userPlace = {
      latitude: response.latt,
      longitude: response.longt,
      city: response.city,
      country: response.country,
    };

    return userPlace;
  }
);

export const fetchLocationByPlace = createAsyncThunk(
  "fetchLocationByPlace",
  async (query) => {
    const url = `https://geocode.xyz/${query}?json=1&auth=${process.env.REACT_APP_GEO_KEY}`;
    const response = await fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error.message));

    const place = {
      latitude: response.latt,
      longitude: response.longt,
      city: response.standard.city,
      country: response.standard.countryname,
    };
    return place;
  }
);

export const fetchWeatherForecast = createAsyncThunk(
  "fetchWeatherForecast",
  async (coords) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,precipitation,cloudcover`
    )
      .then((response) => response.json())
      .catch((error) => console.error(error.message));
    return { ...response, city: coords.city };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (state.user.places) {
        state.places = state.user.places;
      } else {
        const places = localStorage.getItem(`user-${state.user.email}`);
        if (places) {
          state.places = JSON.parse(places);
        }
      }
    },
    logOut: (state) => {
      state.user = null;
    },
    removePlace: (state, action) => {
      const places = state.places;
      const filteredPlaces = places.filter((place) => {
        if (
          place.longitude !== action.payload.longitude &&
          place.latitude !== action.payload.latitude
        ) {
          return place;
        }
        return undefined;
      });
      state.places = filteredPlaces;
      const { user } = state;
      localStorage.setItem(`user-${user.email}`, JSON.stringify(state.places));
      updateOrCreateUser(
        user.email,
        user.name,
        user.coords,
        user.location,
        state.places
      );
    },
    setWeatherForecast: (state, action) => {
      state.weatherForecast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.weatherForecast = action.payload;
      })
      .addCase(fetchLocationByPlace.fulfilled, (state, action) => {
        const { user } = state;
        state.places = [...state.places, action.payload];
        localStorage.setItem(
          `user-${user.email}`,
          JSON.stringify(state.places)
        );
        updateOrCreateUser(
          user.email,
          user.name,
          user.coords,
          user.location,
          state.places
        );
      })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.user.location = action.payload;
        localStorage.setItem("user-location", JSON.stringify(action.payload));
        const { user } = state;
        updateOrCreateUser(
          user.email,
          user.name,
          user.coords,
          user.location,
          user.places
        );
      });
  },
});

export const { setUser, logOut, setWeatherForecast, removePlace } =
  authSlice.actions;

export const state = (state) => state.auth;

export default authSlice.reducer;
