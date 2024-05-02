import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/MovieSlice";
import { useEffect } from "react";
import { fetchDataFromApi } from "../@/lib/api";
import { RootState } from "./store/store";
import { Home } from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/explore/Movies";
import Details from "./pages/Details/Details";
const App = () => {
  const url = useSelector((state: RootState) => state.home.url);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Details />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore/Movies" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
