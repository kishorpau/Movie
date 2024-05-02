import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
  name: "Home",

  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = MovieSlice.actions;

export default MovieSlice.reducer;
