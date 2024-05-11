import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../@/lib/api";

interface Movie {
  genres: string[];
  backdrop_url: string;
  title: string;
  overview: string;
  poster_path: string;
  tagline: string;
  id: number;
  backdrop_path: string;
  vote_average: number;
  name?: string; // Add the 'name' property here
  cast?: {
    id: number;
    character: string;
    cast_id: string;
    name: string;
    profile_path: string;
  }[];
}

interface ApiResponse {
  data: {
    results: Movie[];
  } | null;
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
    fetchDataFromApi(url, {})
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
  //@ts-expect-error it works
  return { data, loading, error };
};

export default useFetch;
