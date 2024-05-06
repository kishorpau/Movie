import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    searchResults: { tv: null, movie: null },
  },
  reducers: {
    setApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setApiConfiguration, setGenres, setSearchResults } =
  MovieSlice.actions;

export default MovieSlice.reducer;
