import React, { useEffect, useState } from "react";
// import { categoryMovies } from "../Services/Api";
import { Box, Typography, Button } from "@mui/material";
import styles from "./MoviePages.module.css";
import Header from "../Components/Common/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../Helpers/httprequest";
import Footer from "../Components/Common/Footer";
import Loader from "../Components/Loader";


const MoviePages = ({ title, api }) => {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  const loc = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //movie_pages
  const {
    data: movieData,
    isError: movieisError,
    isFetching: movieisFetching,
  } = useQuery({
    queryKey: ["movie_pages",page],
    queryFn: () =>
      httpRequest(
        "get",
        `/movie/top_rated?api_key=${API_KEY}&page=${page}`,
        undefined,
        undefined,
        undefined,
      ),
    refetchOnWindowFocus: false,
    refetch: false,
    enabled: loc.pathname === "/movie",
    // staleTime:0,
    
  });

  useEffect(() => {
    if (movieData?.results) {
      setMovies(movieData.results  || []);
    }
  }, [movieData, page,movieisFetching]);

  // popular_pages
  const {
    data: popularData,
    isError: popularisError,
    isFetching: popularisFetching,
  } = useQuery({
    queryKey: ["popular_pages",page],
    queryFn: () =>
      httpRequest(
        "get",
        `/movie/popular?api_key=${API_KEY}&page=${page}`,
        undefined,
        undefined,
        undefined,
      ),
    refetchOnWindowFocus: false,
    refetch: false,
    enabled: loc.pathname === "/popular",
    // staleTime:0,
  });

  useEffect(() => {
    if (popularData?.results) {
      setMovies(popularData.results ||[]);
    }
  }, [popularData, page,popularisFetching]);

  //tvshows_pages
  const {
    data: tvshowData,
    isError: tvshowisError,
    isFetching: tvshowisFetching,
  } = useQuery({
    queryKey: ["tvshows_pages",page],
    queryFn: () =>
      httpRequest(
        "get",
        `/tv/top_rated?api_key=${API_KEY}&page=${page}`,
        undefined,
        undefined,
        undefined,
      ),
    refetchOnWindowFocus: false,
    refetch: false,
    enabled: loc.pathname === "/tvshows",
    // staleTime:0,
  });

  useEffect(() => {
    if (tvshowData?.results) {
      setMovies(tvshowData.results || []);
    }
  }, [tvshowData, page,tvshowisFetching]);

  //upcoming_pages
  const {
    data: upcomingData,
    isError: upcomingisError,
    isFetching: upcomingisFetching,
  } = useQuery({
    queryKey: ["upcoming_pages",page],
    queryFn: () =>
      httpRequest(
        "get",
        `/movie/upcoming?api_key=${API_KEY}&page=${page}`,
        undefined,
        undefined,
        undefined,
      ),
    refetchOnWindowFocus: false,
    refetch: false,
    enabled: loc.pathname === "/upcoming",
    // staleTime:0,
  });

  useEffect(() => {
    if (upcomingData?.results) {
      setMovies(upcomingData.results || []);
    }
  }, [upcomingData, page,upcomingisFetching]);

  if (
    movieisFetching ||
    popularisFetching ||
    upcomingisFetching ||
    tvshowisFetching
  )
    return <Loader />;

  if (
    movieisError ||
    popularisError ||
    upcomingisError ||
    tvshowisError
  )
    return <Typography> Error....</Typography>;

  return (
    <>
      <Header />
      {movies.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
        >
          {movies.slice(0, 10).map((movie) => (
            <SwiperSlide key={movie.id}>
              <Box className={styles.banner}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  className={styles.bannerImg}
                />

                <Box className={styles.overlay}>
                  <Typography className={styles.bannerTitle}>
                    {movie.title || movie.name}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Box className={styles.container}>
        <Typography className={styles.heading}>{title}</Typography>

        <Box className={styles.moviesGrid}>
          {movies?.map((movie) => (
            <Box
              className={styles.card}
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                loading='lazy'
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title || movie.name}
                className={styles.poster}
              />

              <Box className={styles.cardOverlay}>
                <Typography className={styles.movieTitle}>
                  {movie.title || movie.name}
                </Typography>

                <Typography className={styles.rating}>
                  ⭐ {movie.vote_average?.toFixed(1)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <Typography sx={{ color: "white" }}>Page {page}</Typography>

          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Footer/>
    </>
  );
};

export default MoviePages;
