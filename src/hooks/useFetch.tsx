import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../@/lib/api";

interface Movie {
  results: Movie | null;

  genres: string[];
  backdrop_url: string;
  title: string;
  overview: string;
  poster_path: string;
  tagline: string;
  backdrop_path: string;
  vote_Average: number;
  cast: {
    character: string;
    cast_id: number;
    name: string;
    profile_path: string;
  };
}

interface ApiResponse {
  data: Movie | null;
  loading: boolean | string | undefined;
  error: string;
}

const useFetch = (url: string): ApiResponse => {
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean | string | undefined>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading("loading..");
    setData(null);
    setError("");
    fetchDataFromApi(url, "")
      .then((res: Movie) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("something went wrong");
        console.log(err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
