import { Home } from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/explore/Movies";
import Details from "./pages/Details/Details";
import TvSeries from "./pages/explore/TvSeries";
import SearchResultPage from "./pages/SearchResultPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:media/:id" element={<Details />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore/Movies" element={<Movies />} />
        <Route path="/explore/Tv" element={<TvSeries />} />
        <Route path="/search-results" element={<SearchResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
