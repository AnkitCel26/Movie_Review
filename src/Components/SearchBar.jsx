import React, { useEffect, useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "./SearchBar.module.css";
import httpRequest from "../Helpers/httprequest";

const SearchBar = () => {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search_movies", query],
    queryFn: () =>
      httpRequest(
        "get",
        `/search/movie?api_key=${API_KEY}&query=${query}`,
        undefined,
        undefined,
        undefined,
      ),
    enabled: query.trim() !== "",
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    setResults(data?.results || []);
  }, [data]);

  return (
    <Box className={styles.searchContainer}>
      <InputBase
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
      {results.length > 0 && (
        <Box className={styles.resultsBox}>
          {results.slice(0, 6).map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Box className={styles.resultItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.resultImage}
                />

                <Box>
                  <Typography className={styles.movieName}>
                    {movie.title}
                  </Typography>

                  <Typography className={styles.rating}>
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
